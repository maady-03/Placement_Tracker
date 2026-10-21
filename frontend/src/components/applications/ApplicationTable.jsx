import { Link, useNavigate } from "react-router-dom";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { formatDate } from "../../utils/format";

const COLUMNS = ["Company", "Type", "Status", "Applied", "Deadline"];

function ApplicationTable({ applications }) {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left">
          <thead>
            <tr className="border-b border-line">
              {COLUMNS.map((column) => (
                <th
                  key={column}
                  className="px-5 py-3 text-xs font-medium text-ink-muted"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {applications.map((application) => (
              <tr
                key={application._id}
                onClick={() => navigate(`/applications/${application._id}`)}
                className="cursor-pointer border-b border-line transition-colors last:border-b-0 hover:bg-surface-raised"
              >
                <td className="px-5 py-4">
                  <Link
                    to={`/applications/${application._id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="block text-sm font-medium text-ink"
                  >
                    {application.company?.name}
                  </Link>
                  <p className="text-xs text-ink-muted">{application.role}</p>
                </td>

                <td className="px-5 py-4 text-sm capitalize text-ink-muted">
                  {application.type}
                </td>

                <td className="px-5 py-4">
                  <Badge status={application.status} />
                </td>

                <td className="px-5 py-4 font-mono text-xs text-ink-muted">
                  {formatDate(application.appliedDate)}
                </td>

                <td className="px-5 py-4 font-mono text-xs text-ink-muted">
                  {formatDate(application.deadline)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default ApplicationTable;