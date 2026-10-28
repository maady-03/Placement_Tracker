import { useState } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Input from "../ui/Input";

const PLATFORMS = [
  { key: "leetcode", label: "LeetCode username" },
  { key: "codeforces", label: "Codeforces handle" },
  { key: "codechef", label: "CodeChef username" },
  { key: "gfg", label: "GeeksforGeeks username" },
];

function PlatformsForm({ handles, onClose, onSubmit }) {
  const [values, setValues] = useState(() =>
    Object.fromEntries(PLATFORMS.map(({ key }) => [key, handles?.[key] ?? ""]))
  );
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = Object.fromEntries(
      PLATFORMS.map(({ key }) => [key, values[key].trim()])
    );

    setIsSubmitting(true);
    try {
      await onSubmit(payload);
    } catch (err) {
      setServerError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm text-ink-muted">
        Add the platforms you use. Leave a field empty to unlink it.
      </p>

      {serverError && (
        <p className="rounded-lg bg-status-rejected/15 px-3 py-2 text-sm text-status-rejected">
          {serverError}
        </p>
      )}

      {PLATFORMS.map(({ key, label }) => (
        <Input
          key={key}
          label={label}
          name={key}
          value={values[key]}
          onChange={handleChange}
          autoComplete="off"
        />
      ))}

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving and syncing..." : "Save"}
        </Button>
      </div>
    </form>
  );
}

// The form mounts only while open, so its state resets every time.
function PlatformsModal({ open, onClose, handles, onSubmit }) {
  return (
    <Modal open={open} onClose={onClose} title="Connect platforms">
      <PlatformsForm handles={handles} onClose={onClose} onSubmit={onSubmit} />
    </Modal>
  );
}

export default PlatformsModal;