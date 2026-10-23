import { useState } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { isValidUrl } from "../../utils/format";

const FIELDS = ["name", "website", "location", "industry", "notes"];
const NOTES_LIMIT = 500;

function CompanyForm({ company, onClose, onSubmit }) {
  const [values, setValues] = useState(() =>
    Object.fromEntries(FIELDS.map((key) => [key, company?.[key] ?? ""]))
  );
  const [nameError, setNameError] = useState("");
  const [websiteError, setWebsiteError] = useState("");
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    if (name === "name") setNameError("");
    if (name === "website") setWebsiteError("");
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const website = values.website.trim();
    const nameMissing = !values.name.trim();
    const websiteInvalid = Boolean(website) && !isValidUrl(website);

    if (nameMissing) setNameError("Enter the company name.");
    if (websiteInvalid) setWebsiteError("Enter a valid URL.");
    if (nameMissing || websiteInvalid) return;

    const payload = {};
    for (const key of FIELDS) {
      const value = values[key].trim();
      if (value) payload[key] = value;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(payload);
    } catch (err) {
      setServerError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {serverError && (
        <p className="rounded-lg bg-status-rejected/15 px-3 py-2 text-sm text-status-rejected">
          {serverError}
        </p>
      )}

      <Input
        label="Name *"
        name="name"
        value={values.name}
        onChange={handleChange}
        error={nameError}
        maxLength={100}
      />
      <Input
        label="Website"
        name="website"
        value={values.website}
        onChange={handleChange}
        error={websiteError}
        placeholder="https://..."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Location"
          name="location"
          value={values.location}
          onChange={handleChange}
        />
        <Input
          label="Industry"
          name="industry"
          value={values.industry}
          onChange={handleChange}
        />
      </div>

      <div>
        <label
          htmlFor="company-notes"
          className="mb-1.5 block text-xs font-medium text-ink-muted"
        >
          Notes
        </label>
        <textarea
          id="company-notes"
          name="notes"
          rows={3}
          maxLength={NOTES_LIMIT}
          value={values.notes}
          onChange={handleChange}
          className="w-full resize-y rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
        />
        <p className="mt-1 text-right font-mono text-xs text-ink-faint">
          {values.notes.length}/{NOTES_LIMIT}
        </p>
      </div>

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : company ? "Save changes" : "Add company"}
        </Button>
      </div>
    </form>
  );
}

// The form mounts only while open, so its state resets every time.
function CompanyModal({ open, onClose, company, onSubmit }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={company ? "Edit company" : "Add company"}
    >
      <CompanyForm company={company} onClose={onClose} onSubmit={onSubmit} />
    </Modal>
  );
}

export default CompanyModal;