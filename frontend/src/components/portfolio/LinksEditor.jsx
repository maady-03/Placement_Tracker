// src/components/portfolio/LinksEditor.jsx
import { useState } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { isValidUrl } from "../../utils/format";

const FIELDS = [
  { key: "github", label: "GitHub" },
  { key: "portfolio", label: "Portfolio" },
];

function LinksForm({ links, onClose, onSave }) {
  const [values, setValues] = useState(() =>
    Object.fromEntries(FIELDS.map(({ key }) => [key, links?.[key] ?? ""]))
  );
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const found = {};
    for (const { key } of FIELDS) {
      const url = values[key].trim();
      if (url && !isValidUrl(url)) found[key] = "Enter a valid URL.";
    }
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setIsSaving(true);
    setServerError("");

    try {
      await onSave(
        Object.fromEntries(FIELDS.map(({ key }) => [key, values[key].trim()]))
      );
    } catch (err) {
      setServerError(err?.message || "Could not save links.");
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {serverError && (
        <p className="rounded-lg bg-status-rejected/15 px-3 py-2 text-sm text-status-rejected">
          {serverError}
        </p>
      )}

      {FIELDS.map(({ key, label }) => (
        <Input
          key={key}
          label={label}
          name={key}
          placeholder="https://..."
          value={values[key]}
          onChange={handleChange}
          error={errors[key]}
        />
      ))}

      <div className="flex justify-end gap-2 border-t border-line pt-4">
        <Button variant="ghost" onClick={onClose} disabled={isSaving}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save links"}
        </Button>
      </div>
    </form>
  );
}

function LinksEditor({ open, links, onClose, onSave }) {
  return (
    <Modal open={open} onClose={onClose} title="Edit developer links">
      <LinksForm links={links} onClose={onClose} onSave={onSave} />
    </Modal>
  );
}

export default LinksEditor;