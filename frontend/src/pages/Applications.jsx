import { useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, SearchX } from "lucide-react";
import useApplications from "../hooks/useApplications";
import useDebounce from "../hooks/useDebounce";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Skeleton from "../components/ui/Skeleton";
import EmptyState from "../components/ui/EmptyState";
import Pagination from "../components/ui/Pagination";
import ApplicationFilters from "../components/applications/ApplicationFilters";
import ApplicationTable from "../components/applications/ApplicationTable";
import ApplicationCard from "../components/applications/ApplicationCard";

const INITIAL_FILTERS = { search: "", status: "", type: "" };
const PAGE_SIZE = 10;

function ListSkeleton() {
  return (
    <Card>
      {[1, 2, 3, 4, 5].map((n) => (
        <div
          key={n}
          className="flex items-center justify-between border-b border-line px-5 py-4 last:border-b-0"
        >
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-44" />
          </div>
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      ))}
    </Card>
  );
}

function Applications() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(filters.search.trim());

  const params = { page, limit: PAGE_SIZE };
  if (debouncedSearch) params.search = debouncedSearch;
  if (filters.status) params.status = filters.status;
  if (filters.type) params.type = filters.type;

  const { applications, pagination, isLoading, error, refetch } =
    useApplications(params);

  const hasFilters = Boolean(filters.search || filters.status || filters.type);

  const handleFilterChange = (changes) => {
    setFilters((previous) => ({ ...previous, ...changes }));
    setPage(1);
  };

  const handleClear = () => {
    setFilters(INITIAL_FILTERS);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Applications</h1>
          <p className="mt-1 text-sm text-ink-muted">
            {pagination
              ? `${pagination.total} total`
              : "Track every company you apply to."}
          </p>
        </div>

        <Button as={Link} to="/applications/new">
          New Application
        </Button>
      </div>

      <ApplicationFilters
        filters={filters}
        onChange={handleFilterChange}
        onClear={handleClear}
      />

      {isLoading && <ListSkeleton />}

      {!isLoading && error && (
        <Card className="flex items-center justify-between gap-4 p-5">
          <p className="text-sm text-status-rejected">{error}</p>
          <Button variant="secondary" size="sm" onClick={refetch}>
            Retry
          </Button>
        </Card>
      )}

      {!isLoading && !error && applications.length === 0 && (
        <Card>
          {hasFilters ? (
            <EmptyState
              icon={SearchX}
              title="No matching applications"
              description="Try a different search or clear the filters."
              action={
                <Button variant="secondary" size="sm" onClick={handleClear}>
                  Clear filters
                </Button>
              }
            />
          ) : (
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
          )}
        </Card>
      )}

      {!isLoading && !error && applications.length > 0 && (
        <>
          <div className="hidden md:block">
            <ApplicationTable applications={applications} />
          </div>

          <div className="space-y-3 md:hidden">
            {applications.map((application) => (
              <ApplicationCard
                key={application._id}
                application={application}
              />
            ))}
          </div>

          {pagination?.totalPages > 1 && (
            <Card>
              <Pagination
                page={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={setPage}
              />
            </Card>
          )}
        </>
      )}
    </div>
  );
}

export default Applications;