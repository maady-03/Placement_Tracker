import { Link } from "react-router-dom";
import { CalendarClock } from "lucide-react";
import Card from "../ui/Card";
import Skeleton from "../ui/Skeleton";
import EmptyState from "../ui/EmptyState";
import { daysUntil, formatDate, formatDaysLeft } from "../../utils/format";

function urgencyClass(value) {
  const days = daysUntil(value);

  if (days <= 2) return "bg-status-rejected/15 text-status-rejected";
  if (days <= 7) return "bg-status-oa/15 text-status-oa";
  return "bg-status-neutral/15 text-status-neutral";
}

function RowSkeleton() {
  return (
    <div className="flex items-center justify-between border-t border-line px-5 py-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-32" />
      </div>
      <Skeleton className="h-5 w-16 rounded-full" />
    </div>
  );
}

function UpcomingDeadlines({ applications, isLoading }) {
  return (
    <Card as="section">
      <div className="px-5 py-4">
        <h2 className="text-sm font-semibold text-ink">Upcoming Deadlines</h2>
      </div>

      {isLoading && [1, 2, 3].map((n) => <RowSkeleton key={n} />)}

      {!isLoading && applications.length === 0 && (
        <div className="border-t border-line">
          <EmptyState
            icon={CalendarClock}
            title="No upcoming deadlines"
            description="Deadlines you add to applications will show up here."
          />
        </div>
      )}

      {!isLoading &&
        applications.map((application) => (
          <Link
            key={application._id}
            to={`/applications/${application._id}`}
            className="flex items-center justify-between gap-4 border-t border-line px-5 py-4 transition-colors hover:bg-surface-raised"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-ink">
                {application.company?.name}
              </p>
              <p className="truncate text-xs text-ink-muted">
                {application.role} ·{" "}
                <span className="font-mono">
                  {formatDate(application.deadline)}
                </span>
              </p>
            </div>

            <span
              className={`shrink-0 whitespace-nowrap rounded-full px-2.5 py-0.5 font-mono text-xs font-medium ${urgencyClass(
                application.deadline
              )}`}
            >
              {formatDaysLeft(application.deadline)}
            </span>
          </Link>
        ))}
    </Card>
  );
}

export default UpcomingDeadlines;