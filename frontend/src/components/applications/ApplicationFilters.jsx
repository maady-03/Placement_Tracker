import { Search } from "lucide-react";
import Select from "../ui/Select";
import Button from "../ui/Button";
import { APPLICATION_TYPES, STATUSES } from "../../utils/constants";

function ApplicationFilters({ filters, onChange, onClear }) {
  const hasActiveFilters = Boolean(
    filters.search || filters.status || filters.type
  );

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
        />
        <input
          type="search"
          value={filters.search}
          onChange={(e) => onChange({ search: e.target.value })}
          placeholder="Search company or role"
          aria-label="Search applications"
          className="h-10 w-full rounded-lg border border-line bg-canvas pl-9 pr-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:flex">
        <div className="sm:w-40">
          <Select
            aria-label="Filter by status"
            value={filters.status}
            onChange={(e) => onChange({ status: e.target.value })}
          >
            <option value="">All statuses</option>
            {Object.entries(STATUSES).map(([key, { label }]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </Select>
        </div>

        <div className="sm:w-40">
          <Select
            aria-label="Filter by type"
            value={filters.type}
            onChange={(e) => onChange({ type: e.target.value })}
          >
            <option value="">All types</option>
            {Object.entries(APPLICATION_TYPES).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={onClear}>
          Clear
        </Button>
      )}
    </div>
  );
}

export default ApplicationFilters;