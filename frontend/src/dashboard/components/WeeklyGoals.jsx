function WeeklyGoals({ data }) {
  return (
    <div className="dashboard-card dashboard-goals-card rounded-lg border border-[var(--dsh-border)] bg-[var(--dsh-surface)] p-6">
      <div className="text-[11px] font-semibold tracking-[2px] uppercase text-[var(--dsh-muted)] mb-4">
        Weekly Goals
      </div>

      <div className="flex flex-col gap-4">
        {data.map((goal) => {
          // Purely visual — the backend will eventually send completed/target
          // and this is just how we turn that into a bar width.
          const percentage = Math.min(
            (goal.completed / goal.target) * 100,
            100,
          );

          return (
            <div key={goal.id}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[13px] font-medium text-[var(--dsh-ink)]">
                  {goal.name}
                </span>
                <span className="text-[12px] tabular-nums text-[var(--dsh-muted)]">
                  {goal.completed} / {goal.target}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-[var(--dsh-bg)] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[var(--dsh-ink)]"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeeklyGoals;
