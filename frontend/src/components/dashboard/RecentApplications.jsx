import { Link } from "react-router-dom";
import { Briefcase } from "lucide-react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Skeleton from "../ui/Skeleton";
import EmptyState from "../ui/EmptyState";
import { formatDate } from "../../utils/format";

function RowSkeleton() {
  return (
    <div className="flex items-center justify-between border-t border-line px-5 py-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-3 w-40" />
      </div>
      <Skeleton className="h-5 w-16 rounded-full" />
    </div>
  );
}

function RecentApplications({ applications, isLoading, error }) {
  return (
    <Card as="section">
      <div className="flex items-center justify-between px-5 py-4">
        <h2 className="text-sm font-semibold text-ink">Recent Applications</h2>

        <Link
          to="/applications"
          className="text-xs font-medium text-accent hover:text-accent-hover"
        >
          View all
        </Link>
      </div>

      {isLoading && [1, 2, 3].map((n) => <RowSkeleton key={n} />)}

      {!isLoading && error && (
        <p className="border-t border-line px-5 py-6 text-sm text-status-rejected">
          {error}
        </p>
      )}

      {!isLoading && !error && applications.length === 0 && (
        <div className="border-t border-line">
          <EmptyState
            icon={Briefcase}
            title="No applications yet"
            description="Add your first application to start tracking."
            action={
              <Button as={Link} to="/applications/new" size="sm">
                New Application
              </Button>
            }
          />
        </div>
      )}

      {!isLoading &&
        !error &&
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
                {application.role}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <Badge status={application.status} />
              <span className="hidden font-mono text-xs text-ink-muted sm:inline">
                {formatDate(application.appliedDate ?? application.createdAt)}
              </span>
            </div>
          </Link>
        ))}
    </Card>
  );
}

export default RecentApplications;