const STAT_LABELS = [
  { key: "dsaSolved", label: "DSA Solved" },
  { key: "weeklySolved", label: "This Week" },
  { key: "applications", label: "Applications" },
  { key: "interviews", label: "Interviews" },
  { key: "offers", label: "Offers" },
];

function QuickStats({ data }) {
  return (
    <div className="dashboard-stat-grid">
      {STAT_LABELS.map(({ key, label }) => (
        <div
          key={key}
          className="dashboard-stat rounded-lg border border-[var(--dsh-border)] bg-[var(--dsh-surface)] px-4 py-3.5"
        >
          <div className="text-xl font-bold tabular-nums text-[var(--dsh-ink)]">
            {data[key]}
          </div>
          <div className="text-[11.5px] text-[var(--dsh-muted)] mt-0.5">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

export default QuickStats;
