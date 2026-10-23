import { useState } from "react";
import { Building2, Plus, Search, SearchX } from "lucide-react";
import useCompanies from "../hooks/useCompanies";
import {
  createCompany,
  updateCompany,
  deleteCompany,
} from "../api/companies";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import Skeleton from "../components/ui/Skeleton";
import EmptyState from "../components/ui/EmptyState";
import CompanyCard from "../components/companies/CompanyCard";
import CompanyModal from "../components/companies/CompanyModal";

function GridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {[1, 2, 3].map((n) => (
        <Skeleton key={n} className="h-36 rounded-xl" />
      ))}
    </div>
  );
}

function Companies() {
  const { companies, isLoading, error, refetch } = useCompanies();

  const [search, setSearch] = useState("");
  // { company: null } = add mode, { company } = edit mode, null = closed.
  const [formModal, setFormModal] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const query = search.trim().toLowerCase();
  const visible = query
    ? companies.filter((c) => c.name.toLowerCase().includes(query))
    : companies;

  const handleSubmit = async (payload) => {
    if (formModal.company) {
      await updateCompany(formModal.company._id, payload);
    } else {
      await createCompany(payload);
    }
    setFormModal(null);
    refetch();
  };

  const closeDelete = () => {
    setToDelete(null);
    setDeleteError("");
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setDeleteError("");

    try {
      await deleteCompany(toDelete._id);
      closeDelete();
      refetch();
    } catch (err) {
      setDeleteError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Companies</h1>
          <p className="mt-1 text-sm text-ink-muted">
            {isLoading ? "Loading..." : `${companies.length} total`}
          </p>
        </div>

        <Button onClick={() => setFormModal({ company: null })}>
          <Plus size={16} />
          Add company
        </Button>
      </div>

      <div className="relative">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
        />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search companies"
          aria-label="Search companies"
          className="h-10 w-full rounded-lg border border-line bg-canvas pl-9 pr-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
        />
      </div>

      {isLoading && <GridSkeleton />}

      {!isLoading && error && (
        <Card className="flex items-center justify-between gap-4 p-5">
          <p className="text-sm text-status-rejected">{error}</p>
          <Button variant="secondary" size="sm" onClick={refetch}>
            Retry
          </Button>
        </Card>
      )}

      {!isLoading && !error && companies.length === 0 && (
        <Card>
          <EmptyState
            icon={Building2}
            title="No companies yet"
            description="Add the companies you are applying to."
            action={
              <Button size="sm" onClick={() => setFormModal({ company: null })}>
                Add company
              </Button>
            }
          />
        </Card>
      )}

      {!isLoading && !error && companies.length > 0 && visible.length === 0 && (
        <Card>
          <EmptyState
            icon={SearchX}
            title="No matching companies"
            description="Try a different search."
          />
        </Card>
      )}

      {!isLoading && !error && visible.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((company) => (
            <CompanyCard
              key={company._id}
              company={company}
              onEdit={(c) => setFormModal({ company: c })}
              onDelete={setToDelete}
            />
          ))}
        </div>
      )}

      <CompanyModal
        open={Boolean(formModal)}
        company={formModal?.company ?? null}
        onClose={() => setFormModal(null)}
        onSubmit={handleSubmit}
      />

      <Modal open={Boolean(toDelete)} onClose={closeDelete} title="Delete company">
        <p className="text-sm text-ink-muted">
          Delete <span className="font-medium text-ink">{toDelete?.name}</span>?
          This cannot be undone.
        </p>

        {deleteError && (
          <p className="mt-4 rounded-lg bg-status-rejected/15 px-3 py-2 text-sm text-status-rejected">
            {deleteError}
          </p>
        )}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={closeDelete}>
            Cancel
          </Button>
          <Button variant="danger" disabled={isDeleting} onClick={handleDelete}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Companies;