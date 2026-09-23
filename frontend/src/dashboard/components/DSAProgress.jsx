import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useTheme, chartPalette } from "../context/ThemeContext";

const RANGES = ["7D", "30D", "3M"];

function DSAProgress({ data }) {
  const [range, setRange] = useState("7D");
  const { theme } = useTheme();
  const colors = chartPalette[theme];

  // The dataset itself always comes from props — the range toggle only
  // changes how much of it is shown.
  const points =
    range === "7D" ? data.slice(-4) : range === "30D" ? data.slice(-8) : data;

  return (
    <div className="dashboard-card dashboard-dsa-card rounded-lg border border-[var(--dsh-border)] bg-[var(--dsh-surface)] p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-[11px] font-semibold tracking-[2px] uppercase text-[var(--dsh-muted)]">
            DSA Progress
          </div>
          <div className="text-xl font-bold tabular-nums text-[var(--dsh-ink)] mt-1">
            {points[points.length - 1]?.solved ?? 0}
            <span className="text-[12px] font-medium text-[var(--dsh-muted)] ml-2">
              problems solved
            </span>
          </div>
        </div>

        <div className="dashboard-segmented-control flex items-center gap-0.5 p-0.5 rounded-md border border-[var(--dsh-border)]">
          {RANGES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={`px-2.5 py-1 rounded-[5px] text-[11px] font-semibold tabular-nums transition-colors ${
                range === r
                  ? "bg-[var(--dsh-ink)] text-[var(--dsh-surface)]"
                  : "text-[var(--dsh-muted)] hover:text-[var(--dsh-ink)]"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="dashboard-chart h-44">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={points}
            margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
          >
            <CartesianGrid stroke={colors.grid} vertical={false} />
            <XAxis
              dataKey="week"
              tick={{ fill: colors.axis, fontSize: 11 }}
              axisLine={{ stroke: colors.grid }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: colors.axis, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "var(--dsh-surface)",
                border: `1px solid ${colors.grid}`,
                borderRadius: 6,
                fontSize: 12,
              }}
              labelStyle={{ color: colors.axis }}
            />
            <Line
              type="monotone"
              dataKey="solved"
              stroke={colors.line}
              strokeWidth={2}
              dot={{ r: 3, fill: colors.line }}
              activeDot={{ r: 4, fill: colors.accent }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DSAProgress;
