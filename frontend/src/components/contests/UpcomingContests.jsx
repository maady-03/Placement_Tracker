import { CalendarClock, ExternalLink } from "lucide-react";
import Card from "../ui/Card";
import Skeleton from "../ui/Skeleton";
import EmptyState from "../ui/EmptyState";
import { PLATFORMS } from "../../utils/constants";
import { formatDate, formatDaysLeft } from "../../utils/format";

const MAX_ROWS = 6;

const formatTime = (value) =>
  new Date(value).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });

function RowSkeleton() {
  return (
    <div className="flex items-center justify-between border-t border-line px-5 py-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-3 w-32" />
      </div>
      <Skeleton className="h-5 w-16 rounded-full" />
    </div>
  );
}

function UpcomingContests({ contests, isLoading, error }) {
  const visible = contests.slice(0, MAX_ROWS);

  return (
    <Card as="section">
      <div className="px-5 py-4">
        <h2 className="text-sm font-semibold text-ink">Upcoming Contests</h2>
      </div>

      {isLoading && [1, 2, 3].map((n) => <RowSkeleton key={n} />)}

      {!isLoading && error && (
        <p className="border-t border-line px-5 py-6 text-sm text-status-rejected">
          {error}
        </p>
      )}

      {!isLoading && !error && visible.length === 0 && (
        <div className="border-t border-line">
          <EmptyState
            icon={CalendarClock}
            title="No upcoming contests"
            description="New contests from your platforms will show up here."
          />
        </div>
      )}

      {!isLoading &&
        !error &&
        visible.map((contest) => {
          const platform = PLATFORMS[contest.platform];

          return (
            <a
              key={contest.id}
              href={contest.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-4 border-t border-line px-5 py-4 transition-colors hover:bg-surface-raised"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">
                  {contest.name}
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                  {platform && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${platform.badge}`}
                    >
                      {platform.label}
                    </span>
                  )}
                  <span className="font-mono text-xs text-ink-muted">
                    {formatDate(contest.startTime)} ·{" "}
                    {formatTime(contest.startTime)}
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <span className="font-mono text-xs text-ink-muted">
                  {formatDaysLeft(contest.startTime)}
                </span>
                <ExternalLink size={14} className="text-ink-faint" />
              </div>
            </a>
          );
        })}
    </Card>
  );
}

export default UpcomingContests;