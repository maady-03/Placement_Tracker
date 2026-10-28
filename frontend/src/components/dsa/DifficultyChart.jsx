import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { PieChart as PieChartIcon } from "lucide-react";
import Card from "../ui/Card";
import Skeleton from "../ui/Skeleton";
import EmptyState from "../ui/EmptyState";

const SEGMENTS = [
  { key: "easy", label: "Easy", color: "#34d399" },
  { key: "medium", label: "Medium", color: "#fbbf24" },
  { key: "hard", label: "Hard", color: "#f87171" },
];

function DifficultyChart({ totals, isLoading }) {
  if (isLoading) {
    return (
      <Card className="p-5">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="mt-5 h-72 w-full" />
      </Card>
    );
  }

  const data = SEGMENTS.map((segment) => ({
    ...segment,
    value: totals?.[segment.key] ?? 0,
  }));
  const total = data.reduce((sum, segment) => sum + segment.value, 0);

  return (
    <Card as="section" className="p-5">
      <h2 className="text-sm font-semibold text-ink">Problems by Difficulty</h2>

      {total === 0 ? (
        <EmptyState
          icon={PieChartIcon}
          title="No difficulty data yet"
          description="Connect LeetCode to see your Easy, Medium and Hard split."
        />
      ) : (
        <div className="mt-4 flex flex-col items-center gap-6 sm:flex-row">
          <div className="relative h-56 w-56 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="label"
                  innerRadius="68%"
                  outerRadius="100%"
                  paddingAngle={3}
                  stroke="none"
                >
                  {data.map((segment) => (
                    <Cell key={segment.key} fill={segment.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#1a1a1a",
                    border: "1px solid #2a2a2a",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  itemStyle={{ color: "#f5f5f5" }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono text-3xl text-ink">{total}</span>
              <span className="text-xs text-ink-muted">solved</span>
            </div>
          </div>

          <ul className="w-full space-y-3">
            {data.map((segment) => (
              <li
                key={segment.key}
                className="flex items-center justify-between text-sm"
              >
                <span className="flex items-center gap-2 text-ink-muted">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: segment.color }}
                  />
                  {segment.label}
                </span>
                <span className="font-mono text-ink">{segment.value}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}

export default DifficultyChart;