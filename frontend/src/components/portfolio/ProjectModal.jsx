// src/components/portfolio/ProjectModal.jsx
import { useRef, useState } from "react";
import { ImagePlus, Loader2, Plus, X } from "lucide-react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";
import { isValidUrl } from "../../utils/format";
import { API_URL } from "../../api/config";

const URL_FIELDS = [
  { key: "liveUrl", label: "Live URL" },
  { key: "githubUrl", label: "GitHub URL" },
];
const TECH_CATEGORIES = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "database", label: "Database" },
  { key: "deployment", label: "Deployment" },
  { key: "other", label: "Other" },
];
const DESC_LIMIT = 500;

// Always returns the full categorized object. A legacy flat array goes to "other".
const toTechStack = (techStack) => {
  const result = Object.fromEntries(TECH_CATEGORIES.map(({ key }) => [key, []]));

  if (Array.isArray(techStack)) {
    result.other = [...techStack];
  } else if (techStack) {
    for (const { key } of TECH_CATEGORIES) {
      result[key] = [...(techStack[key] ?? [])];
    }
  }

  return result;
};

const toValues = (project) => ({
  title: project?.title ?? "",
  description: project?.description ?? "",
  techStack: toTechStack(project?.techStack),
  isFeatured: project?.isFeatured ?? false,
  imageUrl: project?.imageUrl ?? "",
  ...Object.fromEntries(
    URL_FIELDS.map(({ key }) => [key, project?.[key] ?? ""])
  ),
});

// Mirrors the backend's validateProject rules.
function validate(values) {
  const errors = {};

  if (!values.title.trim()) errors.title = "Enter a title.";
  else if (values.title.trim().length > 100)
    errors.title = "Title must be under 100 characters.";

  if (!values.description.trim()) errors.description = "Enter a description.";

  for (const { key } of URL_FIELDS) {
    const url = values[key].trim();
    if (url && !isValidUrl(url)) errors[key] = "Enter a valid URL.";
  }

  return errors;
}

// On edit, emptied URLs are sent as "" so they clear on the server.
function buildPayload(values, isEdit) {
  const payload = {
    title: values.title.trim(),
    description: values.description.trim(),
    techStack: values.techStack,
    isFeatured: values.isFeatured,
  };

  for (const key of [...URL_FIELDS.map((f) => f.key), "imageUrl"]) {
    const url = values[key].trim();
    if (url) payload[key] = url;
    else if (isEdit) payload[key] = "";
  }

  return payload;
}

// Sends the file as multipart/form-data (field "image"); returns the hosted URL.
async function uploadImage(file) {
  const body = new FormData();
  body.append("image", file);

  const res = await fetch(`${API_URL}/api/upload`, {
    method: "POST",
    credentials: "include",
    body,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Image upload failed.");

  return data.imageUrl;
}

function ProjectForm({ project, onClose, onSubmit, onDelete }) {
  const isEdit = Boolean(project);

  const [values, setValues] = useState(() => toValues(project));
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [techCategory, setTechCategory] = useState("frontend");
  const [techName, setTechName] = useState("");
  const [techError, setTechError] = useState("");
  const [notDeployed, setNotDeployed] = useState(
    () => Boolean(project) && !project.liveUrl
  );
  const fileInput = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
    setServerError("");
  };

  const addTech = () => {
    const trimmed = techName.trim();
    if (!trimmed) return;

    const exists = values.techStack[techCategory].some(
      (tech) => tech.toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) {
      setTechError("Already added in this category.");
      return;
    }

    setValues((previous) => ({
      ...previous,
      techStack: {
        ...previous.techStack,
        [techCategory]: [...previous.techStack[techCategory], trimmed],
      },
    }));
    setTechName("");
    setTechError("");
  };

  const removeTech = (category, index) =>
    setValues((previous) => ({
      ...previous,
      techStack: {
        ...previous.techStack,
        [category]: previous.techStack[category].filter((_, i) => i !== index),
      },
    }));

  const toggleNotDeployed = (e) => {
    const checked = e.target.checked;
    setNotDeployed(checked);
    if (checked) {
      setValues((previous) => ({ ...previous, liveUrl: "" }));
      setErrors((previous) => ({ ...previous, liveUrl: "" }));
    }
  };

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // lets the same file be picked again
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Choose an image file.");
      return;
    }

    setIsUploading(true);
    setUploadError("");

    try {
      const imageUrl = await uploadImage(file);
      setValues((previous) => ({ ...previous, imageUrl }));
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setValues((previous) => ({ ...previous, imageUrl: "" }));
    setUploadError("");
  };

  const run = async (action) => {
    setIsSubmitting(true);
    setServerError("");

    try {
      await action();
    } catch (err) {
      setServerError(err.message);
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitted = notDeployed ? { ...values, liveUrl: "" } : values;
    const found = validate(submitted);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    run(() => onSubmit(buildPayload(submitted, isEdit)));
  };

  const field = (name) => ({
    name,
    value: values[name],
    onChange: handleChange,
    error: errors[name],
  });

  const filledCategories = TECH_CATEGORIES.filter(
    ({ key }) => values.techStack[key].length > 0
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {serverError && (
        <p className="rounded-lg bg-status-rejected/15 px-3 py-2 text-sm text-status-rejected">
          {serverError}
        </p>
      )}

      <Input label="Title *" maxLength={100} {...field("title")} />

      <div>
        <label
          htmlFor="project-description"
          className="mb-1.5 block text-xs font-medium text-ink-muted"
        >
          Description *
        </label>
        <textarea
          id="project-description"
          name="description"
          rows={4}
          maxLength={DESC_LIMIT}
          value={values.description}
          onChange={handleChange}
          aria-invalid={Boolean(errors.description)}
          className={`w-full resize-y rounded-lg border bg-canvas px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/40 ${
            errors.description
              ? "border-status-rejected"
              : "border-line focus:border-accent"
          }`}
        />
        <div className="mt-1 flex justify-between">
          <p className="text-xs text-status-rejected">{errors.description}</p>
          <p className="font-mono text-xs text-ink-faint">
            {values.description.length}/{DESC_LIMIT}
          </p>
        </div>
      </div>

      <div>
        <p className="mb-1.5 text-xs font-medium text-ink-muted">Tech stack</p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="sm:w-40">
            <Select
              label="Category"
              value={techCategory}
              onChange={(e) => setTechCategory(e.target.value)}
            >
              {TECH_CATEGORIES.map(({ key, label }) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex-1">
            <Input
              label="Technology"
              value={techName}
              maxLength={40}
              placeholder="e.g. React"
              onChange={(e) => {
                setTechName(e.target.value);
                setTechError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTech();
                }
              }}
            />
          </div>

          <Button variant="secondary" onClick={addTech}>
            <Plus size={16} />
            Add
          </Button>
        </div>

        {techError && (
          <p className="mt-1 text-xs text-status-rejected">{techError}</p>
        )}

        {filledCategories.length > 0 && (
          <div className="mt-3 space-y-2">
            {filledCategories.map(({ key, label }) => (
              <div key={key} className="flex flex-wrap items-center gap-2">
                <span className="w-24 text-xs text-ink-faint">{label}</span>
                {values.techStack[key].map((tech, index) => (
                  <span
                    key={`${tech}-${index}`}
                    className="inline-flex items-center gap-1 rounded-full border border-line bg-surface-raised py-0.5 pl-2.5 pr-1 text-xs text-ink"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTech(key, index)}
                      aria-label={`Remove ${tech}`}
                      className="rounded-full p-0.5 text-ink-muted hover:bg-surface hover:text-ink"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Input
            label="Live URL"
            placeholder="https://..."
            disabled={notDeployed}
            {...field("liveUrl")}
          />
          <label className="mt-2 flex cursor-pointer items-center gap-2 text-xs text-ink-muted">
            <input
              type="checkbox"
              checked={notDeployed}
              onChange={toggleNotDeployed}
              className="h-3.5 w-3.5 accent-accent"
            />
            Not deployed yet (in development)
          </label>
        </div>
        <Input label="GitHub URL" placeholder="https://..." {...field("githubUrl")} />
      </div>

      <div>
        <p className="mb-1.5 text-xs font-medium text-ink-muted">Preview image</p>

        {values.imageUrl && (
          <div className="relative mb-2 h-32 w-full overflow-hidden rounded-lg border border-line bg-canvas sm:w-56">
            <img
              src={values.imageUrl}
              alt="Project preview"
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={removeImage}
              aria-label="Remove image"
              className="absolute right-1.5 top-1.5 rounded-full bg-black/70 p-1 text-ink hover:bg-black"
            >
              <X size={14} />
            </button>
          </div>
        )}

        <label
          className={`flex items-center justify-center gap-2 rounded-lg border border-dashed border-line bg-canvas px-3 py-4 text-sm text-ink-muted focus-within:ring-2 focus-within:ring-accent/40 ${
            isUploading
              ? "cursor-wait opacity-70"
              : "cursor-pointer hover:border-accent hover:text-ink"
          }`}
        >
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            onChange={handleFile}
            disabled={isUploading}
            className="sr-only"
          />
          {isUploading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <ImagePlus size={16} />
              {values.imageUrl ? "Replace image" : "Upload Image"}
            </>
          )}
        </label>

        {uploadError && (
          <p className="mt-1 text-xs text-status-rejected">{uploadError}</p>
        )}
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-line p-3">
        <input
          type="checkbox"
          name="isFeatured"
          checked={values.isFeatured}
          onChange={handleChange}
          className="mt-0.5 h-4 w-4 accent-accent"
        />
        <span>
          <span className="block text-sm font-medium text-ink">
            Set as Major Project
          </span>
          <span className="block text-xs text-ink-muted">
            Shown as the large featured card at the top.
          </span>
        </span>
      </label>

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-end">
        {isEdit &&
          onDelete &&
          (confirming ? (
            <div className="flex items-center gap-2 sm:mr-auto">
              <Button
                variant="danger"
                size="sm"
                disabled={isSubmitting}
                onClick={() => run(() => onDelete(project))}
              >
                Confirm delete
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setConfirming(false)}>
                Keep
              </Button>
            </div>
          ) : (
            <Button
              variant="danger"
              size="sm"
              className="sm:mr-auto"
              onClick={() => setConfirming(true)}
            >
              Delete
            </Button>
          ))}

        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting || isUploading}>
          {isSubmitting ? "Saving..." : isEdit ? "Save changes" : "Add project"}
        </Button>
      </div>
    </form>
  );
}

// The form mounts only while open, so its state resets every time.
function ProjectModal({ open, onClose, project, onSubmit, onDelete }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={project ? "Edit project" : "Add project"}
    >
      <ProjectForm
        project={project}
        onClose={onClose}
        onSubmit={onSubmit}
        onDelete={onDelete}
      />
    </Modal>
  );
}

export default ProjectModal;