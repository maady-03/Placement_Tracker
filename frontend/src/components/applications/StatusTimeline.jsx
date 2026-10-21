import Badge from "../ui/Badge";
import { formatDate } from "../../utils/format";

function StatusTimeline({ timeline = [] }) {
  // The backend appends entries oldest-first, so reverse a copy to show the latest on top.
  const entries = [...timeline].reverse();

  if (entries.length === 0) {
    return <p className="text-sm text-ink-muted">No status changes yet.</p>;
  }

  return (
    <ol>
      {entries.map((entry, index) => {
        const isLatest = index === 0;
        const isLast = index === entries.length - 1;

        return (
          <li
            key={entry._id ?? `${entry.status}-${entry.date}`}
            className="relative flex gap-4 pb-6 last:pb-0"
          >
            {!isLast && (
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-[5px] top-[18px] w-px bg-line"
              />
            )}

            <span
              className={`relative mt-1.5 h-[11px] w-[11px] shrink-0 rounded-full border-2 ${
                isLatest
                  ? "border-accent bg-accent"
                  : "border-line bg-surface"
              }`}
            />

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <Badge status={entry.status} />
                <span className="font-mono text-xs text-ink-muted">
                  {formatDate(entry.date)}
                </span>
              </div>

              {entry.note && (
                <p className="mt-1.5 break-words text-sm text-ink-muted">
                  {entry.note}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default StatusTimeline;