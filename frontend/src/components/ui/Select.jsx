import { useId } from "react";
import { ChevronDown } from "lucide-react";

function Select({ label, error, id, className = "", children, ...props }) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="mb-1.5 block text-xs font-medium text-ink-muted"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <select
          id={selectId}
          aria-invalid={Boolean(error)}
          className={`h-10 w-full appearance-none rounded-lg border bg-canvas pl-3 pr-9 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/40 ${
            error ? "border-status-rejected" : "border-line focus:border-accent"
          } ${className}`}
          {...props}
        >
          {children}
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint"
        />
      </div>

      {error && (
        <p className="mt-1.5 text-xs text-status-rejected">{error}</p>
      )}
    </div>
  );
}

export default Select;