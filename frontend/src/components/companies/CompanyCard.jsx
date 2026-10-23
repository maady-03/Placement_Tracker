import { Factory, MapPin, Pencil, Trash2 } from "lucide-react";
import Card from "../ui/Card";

function CompanyCard({ company, onEdit, onDelete }) {
  const { name, location, industry, applicationCount = 0 } = company;

  return (
    <Card className="flex flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="min-w-0 truncate text-sm font-semibold text-ink">
          {name}
        </h3>

        <div className="-mr-1.5 -mt-1.5 flex shrink-0 items-center">
          <button
            type="button"
            onClick={() => onEdit(company)}
            aria-label={`Edit ${name}`}
            className="rounded-md p-1.5 text-ink-faint hover:bg-surface-raised hover:text-ink"
          >
            <Pencil size={15} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(company)}
            aria-label={`Delete ${name}`}
            className="rounded-md p-1.5 text-ink-faint hover:bg-status-rejected/15 hover:text-status-rejected"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <div className="mt-3 space-y-1.5 text-sm text-ink-muted">
        {location && (
          <p className="flex items-center gap-2">
            <MapPin size={14} className="shrink-0 text-ink-faint" />
            <span className="truncate">{location}</span>
          </p>
        )}
        {industry && (
          <p className="flex items-center gap-2">
            <Factory size={14} className="shrink-0 text-ink-faint" />
            <span className="truncate">{industry}</span>
          </p>
        )}
      </div>

      <div className="mt-5 pt-1">
        <span className="inline-flex items-center rounded-full bg-surface-raised px-2.5 py-0.5 font-mono text-xs text-ink-muted">
          {applicationCount}{" "}
          {applicationCount === 1 ? "application" : "applications"}
        </span>
      </div>
    </Card>
  );
}

export default CompanyCard;