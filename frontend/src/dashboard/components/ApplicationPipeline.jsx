const STAGES = [
  { key: "applied", label: "Applied" },
  { key: "oa", label: "OA" },
  { key: "interview", label: "Interview" },
  { key: "offer", label: "Offer" },
];

function ApplicationPipeline({ data }) {
  const max = data.applied || 1;

  return (
    <div className="dashboard-card dashboard-pipeline-card rounded-lg border border-[var(--dsh-border)] bg-[var(--dsh-surface)] p-6">
      <div className="text-[11px] font-semibold tracking-[2px] uppercase text-[var(--dsh-muted)] mb-4">
        Application Pipeline
      </div>

      <div className="dashboard-pipeline-rows flex flex-col gap-2.5">
        {STAGES.map((stage, index) => {
          const value = data[stage.key];
          const width = Math.max((value / max) * 100, 6);
          const isLast = index === STAGES.length - 1;

          return (
            <div
              key={stage.key}
              className="dashboard-pipeline-row flex items-center gap-3"
            >
              <span className="text-[12px] text-[var(--dsh-muted)] w-16 shrink-0">
                {stage.label}
              </span>
              <div className="flex-1 h-5 rounded-md bg-[var(--dsh-bg)] overflow-hidden">
                <div
                  className={`h-full rounded-md ${
                    isLast ? "bg-[var(--dsh-accent)]" : "bg-[var(--dsh-ink)]"
                  }`}
                  style={{ width: `${width}%` }}
                />
              </div>
              <span className="text-[13px] font-semibold tabular-nums text-[var(--dsh-ink)] w-6 text-right">
                {value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ApplicationPipeline;
