// src/components/portfolio/SkillsEditor.jsx
import { useState } from "react";
import { Plus, X } from "lucide-react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";

const CATEGORIES = ["Tech", "Outreach", "Design", "Other"];

function SkillsForm({ skills, onClose, onSave }) {
  const [draft, setDraft] = useState(() =>
    skills.map(({ name, category }) => ({ name, category }))
  );
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Tech");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const addSkill = () => {
    const trimmed = name.trim();
    if (!trimmed) return;

    const exists = draft.some(
      (skill) => skill.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) {
      setError("That skill is already added.");
      return;
    }

    setDraft((prev) => [...prev, { name: trimmed, category }]);
    setName("");
    setError("");
  };

  const removeSkill = (index) =>
    setDraft((prev) => prev.filter((_, i) => i !== index));

  const handleSave = async () => {
    setIsSaving(true);
    setError("");

    try {
      await onSave(draft);
    } catch (err) {
      setError(err?.message || "Could not save skills.");
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Input
            label="Skill"
            value={name}
            maxLength={40}
            placeholder="e.g. React"
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill();
              }
            }}
          />
        </div>

        <div className="sm:w-36">
          <Select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </div>

        <Button variant="secondary" onClick={addSkill}>
          <Plus size={16} />
          Add
        </Button>
      </div>

      {draft.length === 0 ? (
        <p className="text-sm text-ink-muted">No skills yet.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {draft.map((skill, index) => (
            <span
              key={`${skill.name}-${index}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-raised py-1 pl-3 pr-1.5 text-xs text-ink"
            >
              {skill.name}
              <span className="text-ink-faint">{skill.category}</span>
              <button
                type="button"
                onClick={() => removeSkill(index)}
                aria-label={`Remove ${skill.name}`}
                className="rounded-full p-0.5 text-ink-muted hover:bg-surface hover:text-ink"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}

      {error && <p className="text-sm text-status-rejected">{error}</p>}

      <div className="flex justify-end gap-2 border-t border-line pt-4">
        <Button variant="ghost" onClick={onClose} disabled={isSaving}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save skills"}
        </Button>
      </div>
    </div>
  );
}

function SkillsEditor({ open, skills, onClose, onSave }) {
  return (
    <Modal open={open} onClose={onClose} title="Edit skills">
      <SkillsForm skills={skills} onClose={onClose} onSave={onSave} />
    </Modal>
  );
}

export default SkillsEditor;