import { ExternalLink, History } from "lucide-react";
import Card from "../ui/Card";
import Skeleton from "../ui/Skeleton";
import EmptyState from "../ui/EmptyState";
import { PLATFORMS } from "../../utils/constants";
import { formatTimeAgo } from "../../utils/format";

function RowSkeleton() {
  return (
    <div className="flex items-center justify-between border-t border-line px-5 py-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-3 w-24" />
      </div>
      <Skeleton className="h-3 w-12" />
    </div>
  );
}

function RecentSubmissions({ submissions, isLoading, error }) {
  return (
    <Card as="section">
      <div className="px-5 py-4">
        <h2 className="text-sm font-semibold text-ink">Recent Submissions</h2>
      </div>

      {isLoading && [1, 2, 3].map((n) => <RowSkeleton key={n} />)}

      {!isLoading && error && (
        <p className="border-t border-line px-5 py-6 text-sm text-status-rejected">
          {error}
        </p>
      )}

      {!isLoading && !error && submissions.length === 0 && (
        <div className="border-t border-line">
          <EmptyState
            icon={History}
            title="No recent submissions"
            description="Accepted solutions from LeetCode and Codeforces appear here."
          />
        </div>
      )}

      {!isLoading &&
        !error &&
        submissions.map((submission) => {
          const platform = PLATFORMS[submission.platform];

          return (
            <a
              key={`${submission.platform}-${submission.url}-${submission.time}`}
              href={submission.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-4 border-t border-line px-5 py-4 transition-colors hover:bg-surface-raised"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">
                  {submission.problem}
                </p>
                {platform && (
                  <span
                    className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${platform.badge}`}
                  >
                    {platform.label}
                  </span>
                )}
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <span className="font-mono text-xs text-ink-muted">
                  {formatTimeAgo(submission.time)}
                </span>
                <ExternalLink size={14} className="text-ink-faint" />
              </div>
            </a>
          );
        })}
    </Card>
  );
}

export default RecentSubmissions;