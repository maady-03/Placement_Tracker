import { STATUSES } from "../../utils/constants";

const FALLBACK = {
  label: "Unknown",
  badge: "bg-status-neutral/15 text-status-neutral",
};

function Badge({ status }) {
  const { label, badge } = STATUSES[status] ?? FALLBACK;

  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${badge}`}
    >
      {label}
    </span>
  );
}

export default Badge;