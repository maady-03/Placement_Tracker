import { useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { STATUSES, STATUS_KEYS } from "../../utils/constants";

const NOTE_LIMIT = 500;

function StatusChanger({ currentStatus, onSubmit }) {
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      await onSubmit({ status: selected, note: note.trim() });
      setSelected(null);
      setNote("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card as="section" className="p-5">
      <h2 className="text-sm font-semibold text-ink">Update status</h2>

      <div className="mt-4 flex flex-wrap gap-2">
        {STATUS_KEYS.map((key) => {
          const isCurrent = key === currentStatus;
          const isSelected = key === selected;

          return (
            <button
              key={key}
              type="button"
              disabled={isCurrent || isSubmitting}
              onClick={() => setSelected(isSelected ? null : key)}
              aria-pressed={isSelected}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors disabled:cursor-default ${
                isCurrent
                  ? `border-transparent ${STATUSES[key].badge}`
                  : isSelected
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-line text-ink-muted hover:bg-surface-raised hover:text-ink"
              }`}
            >
              {STATUSES[key].label}
              {isCurrent && " (current)"}
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="mt-5">
          <label
            htmlFor="status-note"
            className="mb-1.5 block text-xs font-medium text-ink-muted"
          >
            Note (optional)
          </label>
          <textarea
            id="status-note"
            rows={3}
            maxLength={NOTE_LIMIT}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. Cleared round 1, HR call on Friday"
            className="w-full resize-y rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
          <p className="mt-1 text-right font-mono text-xs text-ink-faint">
            {note.length}/{NOTE_LIMIT}
          </p>

          {error && (
            <p className="mt-2 text-xs text-status-rejected">{error}</p>
          )}

          <Button
            className="mt-3 w-full"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting
              ? "Updating..."
              : `Move to ${STATUSES[selected].label}`}
          </Button>
        </div>
      )}
    </Card>
  );
}

export default StatusChanger;