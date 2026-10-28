import { useMemo } from "react";
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

// One year of days, starting on a Sunday so each 7-day chunk is a column.
function buildYear(activity) {
  const counts = new Map(activity.map((a) => [a.date, a.count]));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(today);
  start.setDate(start.getDate() - 364);
  start.setDate(start.getDate() - start.getDay());

  const days = [];
  for (const d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
    const date = dateKey(d);
    days.push({
      date,
      count: counts.get(date) ?? 0,
      month: d.toLocaleString("en-US", { month: "short" }),
    });
  }

  let previousMonth = "";
  const monthLabels = [];
  for (let i = 0; i < days.length; i += 7) {
    const { month } = days[i];
    monthLabels.push(month === previousMonth ? "" : month);
    previousMonth = month;
  }

  const total = days.reduce((sum, day) => sum + day.count, 0);

  return { days, monthLabels, total };
}

function ActivityHeatmap({ activity, isLoading }) {
  const { days, monthLabels, total } = useMemo(
    () => buildYear(activity),
    [activity]
  );

  if (isLoading) {
    return (
      <Card className="p-5">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="mt-5 h-28 w-full" />
      </Card>
    );
  }

  return (
    <Card as="section" className="p-5">
      <h2 className="text-sm font-semibold text-ink">
        <span className="font-mono">{total}</span> submissions in the past year
      </h2>

      <div className="mt-5 overflow-x-auto pb-2">
        <div className="w-max">
          <div className="grid auto-cols-[12px] grid-flow-col grid-rows-7 gap-[3px]">
            {days.map(({ date, count }) => (
              <span
                key={date}
                title={`${count} submissions on ${date}`}
                className={`h-3 w-3 rounded-[3px] ${LEVEL_CLASSES[levelFor(count)]}`}
              />
            ))}
          </div>

          <div className="mt-2 grid auto-cols-[12px] grid-flow-col gap-[3px]">
            {monthLabels.map((label, i) => (
              <span
                key={i}
                className="whitespace-nowrap text-[10px] text-ink-faint"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-end gap-1.5 text-xs text-ink-faint">
        <span>Less</span>
        {LEVEL_CLASSES.map((cls) => (
          <span key={cls} className={`h-3 w-3 rounded-[3px] ${cls}`} />
        ))}
        <span>More</span>
      </div>
    </Card>
  );
}

export default ActivityHeatmap;