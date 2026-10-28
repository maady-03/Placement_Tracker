import { ExternalLink } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";

const SPLIT = [
  { key: "easy", label: "Easy", bar: "bg-status-offer" },
  { key: "medium", label: "Medium", bar: "bg-status-oa" },
  { key: "hard", label: "Hard", bar: "bg-status-rejected" },
];

function PlatformCard({ name, data, onConnect }) {
  const status = data?.status ?? "not_linked";

  return (
    <Card className="flex flex-col p-5">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-ink">{name}</h3>

        {status === "ok" && data.profileUrl && (
          <a
            href={data.profileUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${name} profile`}
            className="text-ink-faint hover:text-ink"
          >
            <ExternalLink size={15} />
          </a>
        )}
      </div>

      {status === "not_linked" && (
        <div className="mt-6 flex flex-1 flex-col items-start justify-between gap-4">
          <p className="text-sm text-ink-muted">Not connected yet.</p>
          <Button variant="secondary" size="sm" onClick={onConnect}>
            Connect
          </Button>
        </div>
      )}

      {status === "error" && (
        <div className="mt-6 flex flex-1 flex-col items-start justify-between gap-4">
          <p className="text-sm text-status-rejected">
            {data.error || "Could not fetch this profile."}
          </p>
          <Button variant="secondary" size="sm" onClick={onConnect}>
            Check username
          </Button>
        </div>
      )}

      {status === "ok" && (
        <>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-ink-muted">Rating</p>
              <p className="mt-1 font-mono text-3xl text-ink">
                {data.rating || "—"}
              </p>
            </div>
            <div>
              <p className="text-xs text-ink-muted">Solved</p>
              <p className="mt-1 font-mono text-3xl text-ink">
                {data.solved ?? 0}
              </p>
            </div>
          </div>

          {data.easy !== null && data.easy !== undefined && (
            <div className="mt-5 space-y-2.5">
              {SPLIT.map(({ key, label, bar }) => {
                const value = data[key] ?? 0;
                const pct = data.solved ? (value / data.solved) * 100 : 0;

                return (
                  <div key={key} className="flex items-center gap-3 text-xs">
                    <span className="w-14 text-ink-muted">{label}</span>
                    <div className="h-1.5 flex-1 rounded-full bg-surface-raised">
                      <div
                        className={`h-1.5 rounded-full ${bar}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-8 text-right font-mono text-ink-muted">
                      {value}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {data.contestsAttended > 0 && (
            <p className="mt-5 border-t border-line pt-4 text-xs text-ink-muted">
              <span className="font-mono text-ink">{data.contestsAttended}</span>{" "}
              contests attended
            </p>
          )}
        </>
      )}
    </Card>
  );
}

export default PlatformCard;