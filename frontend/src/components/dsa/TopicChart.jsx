import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { BarChart3 } from "lucide-react";
import Card from "../ui/Card";
import Skeleton from "../ui/Skeleton";
import EmptyState from "../ui/EmptyState";

const MIN_TOPICS = 3;

function TopicChart({ topics, isLoading }) {
  if (isLoading) {
    return (
      <Card className="p-5">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-5 h-72 w-full" />
      </Card>
    );
  }

  return (
    <Card as="section" className="p-5">
      <h2 className="text-sm font-semibold text-ink">Topic Analysis</h2>

      {topics.length < MIN_TOPICS ? (
        <EmptyState
          icon={BarChart3}
          title="No topic data yet"
          description="Connect LeetCode to see your strongest topics."
        />
      ) : (
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={topics} outerRadius="70%">
              <PolarGrid stroke="#2a2a2a" />
              <PolarAngleAxis
                dataKey="name"
                tick={{ fill: "#a3a3a3", fontSize: 11 }}
              />
              <PolarRadiusAxis tick={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  background: "#1a1a1a",
                  border: "1px solid #2a2a2a",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                itemStyle={{ color: "#f5f5f5" }}
                labelStyle={{ color: "#a3a3a3" }}
              />
              <Radar
                name="Solved"
                dataKey="solved"
                stroke="#f58220"
                fill="#f58220"
                fillOpacity={0.25}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}

export default TopicChart;