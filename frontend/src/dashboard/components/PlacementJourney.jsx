import { Check } from "lucide-react";

function PlacementJourney({ data }) {
  return (
    <div className="dashboard-card dashboard-journey-card rounded-lg border border-[var(--dsh-border)] bg-[var(--dsh-surface)] p-6">
      <div className="text-[11px] font-semibold tracking-[2px] uppercase text-[var(--dsh-muted)] mb-5">
        Placement Journey
      </div>

      <div className="flex items-start">
        {data.map((stage, index) => (
          <div key={stage.id} className="flex-1 flex items-start">
            <div className="flex flex-col items-center">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                  stage.status === "completed"
                    ? "bg-[var(--dsh-ink)] border-[var(--dsh-ink)]"
                    : stage.status === "current"
                      ? "border-[var(--dsh-accent)] border-2"
                      : "border-[var(--dsh-border)]"
                }`}
              >
                {stage.status === "completed" && (
                  <Check
                    size={13}
                    strokeWidth={2.5}
                    className="text-[var(--dsh-surface)]"
                  />
                )}
                {stage.status === "current" && (
                  <div className="w-2 h-2 rounded-full bg-[var(--dsh-accent)]" />
                )}
              </div>
              <span
                className={`mt-2 text-[12px] font-medium text-center ${
                  stage.status === "upcoming"
                    ? "text-[var(--dsh-muted)]"
                    : "text-[var(--dsh-ink)]"
                }`}
              >
                {stage.name}
              </span>
            </div>

            {index < data.length - 1 && (
              <div
                className={`flex-1 h-px mt-3 ${
                  stage.status === "completed"
                    ? "bg-[var(--dsh-ink)]"
                    : "bg-[var(--dsh-border)]"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacementJourney;
