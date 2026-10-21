import { useId } from "react";

function Input({ label, error, id, className = "", ...props }) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-xs font-medium text-ink-muted"
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        className={`h-10 w-full rounded-lg border bg-canvas px-3 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent/40 ${
          error ? "border-status-rejected" : "border-line focus:border-accent"
        } ${className}`}
        {...props}
      />

      {error && (
        <p className="mt-1.5 text-xs text-status-rejected">{error}</p>
      )}
    </div>
  );
}

export default Input;