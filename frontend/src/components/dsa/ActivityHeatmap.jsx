import { useMemo } from "react";
import { Code2 } from "lucide-react";
import Card from "../ui/Card";
import Skeleton from "../ui/Skeleton";

const LEVEL_CLASSES = [
  "bg-surface-raised",
  "bg-[#14532d]",
  "bg-[#166534]",
  "bg-[#22c55e]",
  "bg-[#4ade80]",
];

const levelFor = (count) =>
  count >= 10 ? 4 : count >= 6 ? 3 : count >= 3 ? 2 : count >= 1 ? 1 : 0;

const dateKey = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;

// Last 12 calendar months. Each month is its own block of week columns.
function buildMonths(activity) {
  const counts = new Map(activity.map((a) => [a.date, a.count]));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const months = [];
  let total = 0;

  for (let i = 11; i >= 0; i--) {
    const first = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const last = new Date(first.getFullYear(), first.getMonth() + 1, 0);
    const end = last > today ? today : last;

    // Empty slots keep the 1st of the month on its correct weekday row.
    const cells = Array.from({ length: first.getDay() }, (_, n) => ({
      key: `pad-${n}`,
      pad: true,
    }));

    for (const d = new Date(first); d <= end; d.setDate(d.getDate() + 1)) {
      const date = dateKey(d);
      const count = counts.get(date) ?? 0;
      total += count;
      cells.push({
        key: date,
        date,
        count,
        isToday: d.getTime() === today.getTime(),
      });
    }

    months.push({
      key: `${first.getFullYear()}-${first.getMonth()}`,
      label: first.toLocaleString("en-US", { month: "short" }),
      cells,
    });
  }

  return { months, total };
}

function ActivityHeatmap({ activity, isLoading }) {
  const { months, total } = useMemo(() => buildMonths(activity), [activity]);

  if (isLoading) {
    return (
      <Card className="p-5">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="mt-5 h-28 w-full" />
      </Card>
    );
  }

  return (
    <Card as="section" className="relative overflow-hidden p-5">
      {/* Decorative background: soft glow and a faint code watermark. */}
      <div className="pointer-events-none absolute -top-24 right-0 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
      <Code2
        aria-hidden="true"
        size={240}
        strokeWidth={1}
        className="pointer-events-none absolute -bottom-12 -right-6 text-ink opacity-[0.04]"
      />

      <div className="relative">
        <h2 className="text-sm font-semibold text-ink">
          <span className="font-mono">{total}</span> submissions in the past year
        </h2>

        <div className="mt-5 overflow-x-auto pb-2">
          <div className="flex min-w-max justify-between gap-5">
            {months.map((month) => (
              <div key={month.key}>
                <div className="grid auto-cols-[12px] grid-flow-col grid-rows-7 gap-[3px]">
                  {month.cells.map((cell) =>
                    cell.pad ? (
                      <span key={cell.key} className="h-3 w-3" />
                    ) : (
                      <span
                        key={cell.key}
                        title={`${cell.count} submissions on ${cell.date}`}
                        className={`h-3 w-3 rounded-[3px] ${LEVEL_CLASSES[levelFor(cell.count)]} ${
                          cell.isToday ? "ring-1 ring-accent" : ""
                        }`}
                      />
                    )
                  )}
                </div>
                <p className="mt-2 text-[11px] text-ink-faint">{month.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-end gap-1.5 text-xs text-ink-faint">
          <span>Less</span>
          {LEVEL_CLASSES.map((cls) => (
            <span key={cls} className={`h-3 w-3 rounded-[3px] ${cls}`} />
          ))}
          <span>More</span>
        </div>
      </div>
    </Card>
  );
}

export default ActivityHeatmap;