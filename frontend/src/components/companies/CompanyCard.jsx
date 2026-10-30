import { Link } from "react-router-dom";
import { Factory, Pencil, Trash2 } from "lucide-react";
import Card from "../ui/Card";
import CompanyLogo from "../ui/CompanyLogo";

function CompanyCard({ company, onEdit, onDelete }) {
  const { _id, name, industry, applicationCount = 0 } = company;

  return (
    <Card className="relative flex flex-col p-5 transition-colors hover:bg-surface-raised">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <CompanyLogo company={company} />
          <h3 className="min-w-0 truncate text-sm font-semibold text-ink">
            <Link
              to={`/companies/${_id}`}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {name}
            </Link>
          </h3>
        </div>

        <div className="relative z-10 -mr-1.5 -mt-1.5 flex shrink-0 items-center">
          <button
            type="button"
            onClick={() => onEdit(company)}
            aria-label={`Edit ${name}`}
            className="rounded-md p-1.5 text-ink-faint hover:bg-surface hover:text-ink"
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

      {industry && (
        <p className="mt-3 flex items-center gap-2 text-sm text-ink-muted">
          <Factory size={14} className="shrink-0 text-ink-faint" />
          <span className="truncate">{industry}</span>
        </p>
      )}

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