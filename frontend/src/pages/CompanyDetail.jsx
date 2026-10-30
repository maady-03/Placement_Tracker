import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Briefcase, Factory, FileX, Globe } from "lucide-react";
import useCompany from "../hooks/useCompany";
import useApplications from "../hooks/useApplications";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Skeleton from "../components/ui/Skeleton";
import EmptyState from "../components/ui/EmptyState";
import Pagination from "../components/ui/Pagination";
import CompanyLogo from "../components/ui/CompanyLogo";
import ApplicationTable from "../components/applications/ApplicationTable";
import ApplicationCard from "../components/applications/ApplicationCard";
import { toHref } from "../utils/format";

const PAGE_SIZE = 10;

function CompanyDetailContent({ id }) {
  const [page, setPage] = useState(1);

  const { company, isLoading, error, notFound } = useCompany(id);
  const apps = useApplications({ companyId: id, page, limit: PAGE_SIZE });

  if (notFound) {
    return (
      <Card>
        <EmptyState
          icon={FileX}
          title="Company not found"
          description="It may have been deleted, or the link is wrong."
          action={
            <Button as={Link} to="/companies" size="sm">
              Back to companies
            </Button>
          }
        />
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          to="/companies"
          className="inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink"
        >
          <ArrowLeft size={14} />
          Companies
        </Link>

        {isLoading ? (
          <Skeleton className="mt-3 h-14 w-72" />
        ) : error || !company ? (
          <p className="mt-3 text-sm text-status-rejected">
            {error || "Could not load this company."}
          </p>
        ) : (
          <div className="mt-3 flex items-center gap-4">
            <CompanyLogo company={company} size="md" />
            <div className="min-w-0">
              <h1 className="truncate text-2xl font-semibold text-ink">
                {company.name}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-muted">
                {company.industry && (
                  <span className="flex items-center gap-1.5">
                    <Factory size={14} className="text-ink-faint" />
                    {company.industry}
                  </span>
                )}
                {company.website && (
                  <a
                    href={toHref(company.website)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-accent hover:text-accent-hover"
                  >
                    <Globe size={14} />
                    {company.website}
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-ink">
          Applications
          {apps.pagination && (
            <span className="ml-2 font-mono text-xs font-normal text-ink-muted">
              {apps.pagination.total}
            </span>
          )}
        </h2>
        <Button as={Link} to="/applications/new" size="sm">
          New Application
        </Button>
      </div>

      {apps.isLoading && <Skeleton className="h-48 rounded-xl" />}

      {!apps.isLoading && apps.error && (
        <Card className="flex items-center justify-between gap-4 p-5">
          <p className="text-sm text-status-rejected">{apps.error}</p>
          <Button variant="secondary" size="sm" onClick={apps.refetch}>
            Retry
          </Button>
        </Card>
      )}

      {!apps.isLoading && !apps.error && apps.applications.length === 0 && (
        <Card>
          <EmptyState
            icon={Briefcase}
            title="No applications yet"
            description="Applications you add for this company will show up here."
          />
        </Card>
      )}

      {!apps.isLoading && !apps.error && apps.applications.length > 0 && (
        <>
          <div className="hidden md:block">
            <ApplicationTable applications={apps.applications} />
          </div>

          <div className="space-y-3 md:hidden">
            {apps.applications.map((application) => (
              <ApplicationCard key={application._id} application={application} />
            ))}
          </div>

          {apps.pagination?.totalPages > 1 && (
            <Card>
              <Pagination
                page={apps.pagination.page}
                totalPages={apps.pagination.totalPages}
                onPageChange={setPage}
              />
            </Card>
          )}
        </>
      )}
    </div>
  );
}

// Keyed by id so page state resets when navigating between companies.
function CompanyDetail() {
  const { id } = useParams();
  return <CompanyDetailContent key={id} id={id} />;
}

export default CompanyDetail;