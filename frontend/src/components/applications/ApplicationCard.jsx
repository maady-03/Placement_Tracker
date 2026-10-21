import { Link } from "react-router-dom";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { formatDate } from "../../utils/format";

function ApplicationCard({ application }) {
  const { _id, company, role, type, status, appliedDate, deadline } =
    application;

  return (
    <Card
      as={Link}
      to={`/applications/${_id}`}
      className="block p-4 transition-colors hover:bg-surface-raised"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-ink">
            {company?.name}
          </p>
          <p className="truncate text-xs text-ink-muted">{role}</p>
        </div>

        <Badge status={status} />
      </div>

      <dl className="mt-4 grid grid-cols-3 gap-2 text-xs">
        <div>
          <dt className="text-ink-faint">Type</dt>
          <dd className="mt-0.5 capitalize text-ink-muted">{type}</dd>
        </div>

        <div>
          <dt className="text-ink-faint">Applied</dt>
          <dd className="mt-0.5 font-mono text-ink-muted">
            {formatDate(appliedDate)}
          </dd>
        </div>

        <div>
          <dt className="text-ink-faint">Deadline</dt>
          <dd className="mt-0.5 font-mono text-ink-muted">
            {formatDate(deadline)}
          </dd>
        </div>
      </dl>
    </Card>
  );
}

export default ApplicationCard;