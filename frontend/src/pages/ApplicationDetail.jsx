import { Link, useParams } from "react-router-dom";
import { ArrowLeft, FileX } from "lucide-react";
import useApplication from "../hooks/useApplication";
import { changeApplicationStatus } from "../api/applications";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Skeleton from "../components/ui/Skeleton";
import EmptyState from "../components/ui/EmptyState";
import StatusTimeline from "../components/applications/StatusTimeline";
import StatusChanger from "../components/applications/StatusChanger";
import CompanyInfoCard from "../components/applications/CompanyInfoCard";
import { formatDate, toHref } from "../utils/format";

function Detail({ label, children }) {
  return (
    <div>
      <dt className="text-xs text-ink-faint">{label}</dt>
      <dd className="mt-1 break-words text-sm text-ink-muted">{children}</dd>
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-64" />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Skeleton className="h-56 rounded-xl" />
          <Skeleton className="h-48 rounded-xl" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-40 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

function ApplicationDetail() {
  const { id } = useParams();
  const {
    application,
    isLoading,
    error,
    notFound,
    refetch,
    replaceApplication,
  } = useApplication(id);

  const handleStatusChange = async (payload) => {
    const data = await changeApplicationStatus(id, payload);
    replaceApplication(data.application);
  };

  if (isLoading) return <DetailSkeleton />;

  if (notFound) {
    return (
      <Card>
        <EmptyState
          icon={FileX}
          title="Application not found"
          description="It may have been deleted, or the link is wrong."
          action={
            <Button as={Link} to="/applications" size="sm">
              Back to applications
            </Button>
          }
        />
      </Card>
    );
  }

  if (error || !application) {
    return (
      <Card className="flex items-center justify-between gap-4 p-5">
        <p className="text-sm text-status-rejected">
          {error || "Could not load this application."}
        </p>
        <Button variant="secondary" size="sm" onClick={refetch}>
          Retry
        </Button>
      </Card>
    );
  }

  const {
    company,
    role,
    type,
    status,
    appliedDate,
    deadline,
    source,
    jobLink,
    resumeVersion,
    notes,
    timeline,
  } = application;

  return (
    <div className="space-y-6">
      <div>
        <Link
          to="/applications"
          className="inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink"
        >
          <ArrowLeft size={14} />
          Applications
        </Link>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold text-ink">{role}</h1>
          <Badge status={status} />
        </div>
        <p className="mt-1 text-sm text-ink-muted">{company?.name}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card as="section" className="p-5">
            <h2 className="text-sm font-semibold text-ink">Details</h2>

            <dl className="mt-5 grid gap-5 sm:grid-cols-2">
              <Detail label="Type">
                <span className="capitalize">{type}</span>
              </Detail>
              <Detail label="Applied">
                <span className="font-mono">{formatDate(appliedDate)}</span>
              </Detail>
              <Detail label="Deadline">
                <span className="font-mono">{formatDate(deadline)}</span>
              </Detail>
              <Detail label="Source">{source || "—"}</Detail>
              <Detail label="Resume version">{resumeVersion || "—"}</Detail>
              <Detail label="Job link">
                {jobLink ? (
                  <a
                    href={toHref(jobLink)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent hover:text-accent-hover"
                  >
                    Open posting
                  </a>
                ) : (
                  "—"
                )}
              </Detail>
            </dl>

            {notes && (
              <div className="mt-5 border-t border-line pt-5">
                <p className="text-xs text-ink-faint">Notes</p>
                <p className="mt-1 whitespace-pre-wrap break-words text-sm text-ink-muted">
                  {notes}
                </p>
              </div>
            )}
          </Card>

          <Card as="section" className="p-5">
            <h2 className="mb-5 text-sm font-semibold text-ink">Timeline</h2>
            <StatusTimeline timeline={timeline} />
          </Card>
        </div>

        {/* On mobile the status changer comes first, right under the header. */}
        <div className="order-first space-y-6 lg:order-none">
          <StatusChanger
            currentStatus={status}
            onSubmit={handleStatusChange}
          />
          <CompanyInfoCard company={company} />
        </div>
      </div>
    </div>
  );
}

export default ApplicationDetail;