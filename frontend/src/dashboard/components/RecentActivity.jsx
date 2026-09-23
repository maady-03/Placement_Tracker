function RecentActivity({ data }) {
  return (
    <div className="dashboard-card dashboard-activity-card rounded-lg border border-[var(--dsh-border)] bg-[var(--dsh-surface)] p-6">
      <div className="text-[11px] font-semibold tracking-[2px] uppercase text-[var(--dsh-muted)] mb-4">
        Recent Activity
      </div>

      {data.length === 0 ? (
        <p className="text-[13px] text-[var(--dsh-muted)]">
          No activity yet. Start solving problems to see your progress here.
        </p>
      ) : (
        <div className="flex flex-col">
          {data.map((activity, index) => (
            <div
              key={activity.id}
              className={`flex items-center justify-between py-2.5 ${
                index > 0 ? "border-t border-[var(--dsh-border)]" : ""
              }`}
            >
              <div>
                <div className="text-[13px] font-medium text-[var(--dsh-ink)]">
                  {activity.title}
                </div>
                <div className="text-[11.5px] text-[var(--dsh-muted)] mt-0.5 capitalize">
                  {activity.type}
                </div>
              </div>
              <span className="text-[11.5px] tabular-nums text-[var(--dsh-muted)] whitespace-nowrap">
                {activity.timestamp}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentActivity;
