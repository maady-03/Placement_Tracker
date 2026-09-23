// Purely visual conversion of a percentage into an SVG stroke offset.
// The percentage itself always comes from `data.overall`.
const RADIUS = 46;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function PlacementReadiness({ data }) {
  const offset = CIRCUMFERENCE - (data.overall / 100) * CIRCUMFERENCE;

  return (
    <div className="dashboard-card dashboard-readiness-card rounded-lg border border-[var(--dsh-border)] bg-[var(--dsh-surface)] p-6">
      <div className="text-[11px] font-semibold tracking-[2px] uppercase text-[var(--dsh-muted)] mb-5">
        Placement Readiness
      </div>

      <div className="dashboard-readiness-body flex items-center gap-7">
        <div className="relative w-28 h-28 shrink-0">
          <svg viewBox="0 0 108 108" className="w-28 h-28 -rotate-90">
            <circle
              cx="54"
              cy="54"
              r={RADIUS}
              fill="none"
              stroke="var(--dsh-border)"
              strokeWidth="8"
            />
            <circle
              cx="54"
              cy="54"
              r={RADIUS}
              fill="none"
              stroke="var(--dsh-ink)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold tabular-nums text-[var(--dsh-ink)]">
              {data.overall}%
            </span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[13px] leading-relaxed text-[var(--dsh-muted)] mb-4">
            {data.summary}
          </p>

          <div className="dashboard-readiness-categories flex flex-col gap-2.5">
            {data.categories.map((category) => (
              <div key={category.name} className="flex items-center gap-3">
                <span className="text-[12px] text-[var(--dsh-muted)] w-[150px] shrink-0">
                  {category.name}
                </span>
                <div className="flex-1 h-1.5 rounded-full bg-[var(--dsh-bg)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--dsh-ink)]"
                    style={{ width: `${category.value}%` }}
                  />
                </div>
                <span className="text-[12px] tabular-nums text-[var(--dsh-muted)] w-8 text-right">
                  {category.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlacementReadiness;
