 // src/pages/Settings.jsx
import { useRef, useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import useAuth from "../hooks/useAuth";
import { updateProfile } from "../api/profile";
import { API_URL } from "../api/config";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const ABOUT_LIMIT = 500;

const toValues = (profile) => ({
  avatar: profile?.avatar ?? "",
  college: profile?.college ?? "",
  branch: profile?.branch ?? "",
  graduationYear: profile?.graduationYear ?? "",
  cgpa: profile?.cgpa ?? "",
  backlogs: profile?.backlogs ?? "",
  about: profile?.about ?? "",
});

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

function validate(values) {
  const errors = {};

  if (!values.college.trim()) errors.college = "Enter your college.";
  if (!values.branch.trim()) errors.branch = "Enter your branch.";

  const year = Number(values.graduationYear);
  if (!values.graduationYear) errors.graduationYear = "Enter your graduation year.";
  else if (!Number.isInteger(year) || year < 2000 || year > 2100)
    errors.graduationYear = "Year must be between 2000 and 2100.";

  if (values.cgpa !== "") {
    const cgpa = Number(values.cgpa);
    if (Number.isNaN(cgpa) || cgpa < 0 || cgpa > 10)
      errors.cgpa = "CGPA must be between 0 and 10.";
  }

  if (values.backlogs !== "") {
    const backlogs = Number(values.backlogs);
    if (!Number.isInteger(backlogs) || backlogs < 0)
      errors.backlogs = "Enter 0 or more.";
  }

  return errors;
}

// Cleared numbers are sent as null so they clear on the server.
function buildPayload(values) {
  return {
    avatar: values.avatar,
    college: values.college.trim(),
    branch: values.branch.trim(),
    graduationYear: Number(values.graduationYear),
    cgpa: values.cgpa === "" ? null : Number(values.cgpa),
    backlogs: values.backlogs === "" ? null : Number(values.backlogs),
    about: values.about.trim(),
  };
}

function Settings() {
  const { user, setUser } = useAuth();
  const fileInput = useRef(null);

  const [values, setValues] = useState(() => toValues(user?.profile));
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const initials =
    `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase() || "U";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
    setServerError("");
    setSaved(false);
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
      const avatar = await uploadImage(file);
      setValues((previous) => ({ ...previous, avatar }));
      setSaved(false);
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const removeAvatar = () => {
    setValues((previous) => ({ ...previous, avatar: "" }));
    setSaved(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setIsSaving(true);
    setServerError("");

    try {
      const res = await updateProfile(buildPayload(values));
      setUser(res.user);
      setSaved(true);
    } catch (err) {
      setServerError(err?.message || "Could not save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  const field = (name) => ({
    name,
    value: values[name],
    onChange: handleChange,
    error: errors[name],
  });

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink">Settings</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Manage your profile information.
        </p>
      </div>

      <Card as="form" onSubmit={handleSubmit} noValidate className="space-y-5 p-6">
        <h2 className="text-sm font-semibold text-ink">Basic Info</h2>

        {serverError && (
          <p className="rounded-lg bg-status-rejected/15 px-3 py-2 text-sm text-status-rejected">
            {serverError}
          </p>
        )}

        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-line bg-surface-raised text-xl font-semibold text-ink-muted">
            {values.avatar ? (
              <img
                src={values.avatar}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              initials
            )}
          </div>

          <div>
            <p className="text-xs font-medium text-ink-muted">Profile picture</p>
            <div className="mt-2 flex items-center gap-2">
              <label
                className={`inline-flex items-center gap-2 rounded-lg border border-line bg-surface-raised px-3 py-1.5 text-sm text-ink focus-within:ring-2 focus-within:ring-accent/40 ${
                  isUploading
                    ? "cursor-wait opacity-70"
                    : "cursor-pointer hover:border-accent"
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
                    <Loader2 size={14} className="animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <ImagePlus size={14} />
                    Upload Image
                  </>
                )}
              </label>

              {values.avatar && !isUploading && (
                <Button variant="ghost" size="sm" onClick={removeAvatar}>
                  Remove
                </Button>
              )}
            </div>
            {uploadError && (
              <p className="mt-1 text-xs text-status-rejected">{uploadError}</p>
            )}
          </div>
        </div>

        <Input label="College *" {...field("college")} />
        <Input label="Branch *" {...field("branch")} />

        <div className="grid gap-4 sm:grid-cols-3">
          <Input
            label="Graduation year *"
            type="number"
            {...field("graduationYear")}
          />
          <Input
            label="CGPA"
            type="number"
            step="0.01"
            {...field("cgpa")}
          />
          <Input label="Backlogs" type="number" {...field("backlogs")} />
        </div>

        <div>
          <label
            htmlFor="settings-about"
            className="mb-1.5 block text-xs font-medium text-ink-muted"
          >
            About
          </label>
          <textarea
            id="settings-about"
            name="about"
            rows={4}
            maxLength={ABOUT_LIMIT}
            value={values.about}
            onChange={handleChange}
            className="w-full resize-y rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
          <p className="mt-1 text-right font-mono text-xs text-ink-faint">
            {values.about.length}/{ABOUT_LIMIT}
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-line pt-4">
          {saved && <p className="text-sm text-status-offer">Saved.</p>}
          <Button type="submit" disabled={isSaving || isUploading}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Settings;