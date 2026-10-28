import { useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Flame,
  Link2,
  RefreshCw,
  Trophy,
} from "lucide-react";
import useDsaStats from "../hooks/useDsaStats";
import { updateDsaPlatforms } from "../api/dsa";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import StatCard from "../components/dashboard/StatCard";
import ActivityHeatmap from "../components/dsa/ActivityHeatmap";
import PlatformsModal from "../components/dsa/PlatformsModal";
import PlatformCard from "../components/dsa/PlatformCard";
import Skeleton from "../components/ui/Skeleton";
import useUpcomingContests from "../hooks/useUpcomingContests";
import UpcomingContests from "../components/dsa/UpcomingContests";
import useRecentSubmissions from "../hooks/useRecentSubmissions";
import RecentSubmissions from "../components/dsa/RecentSubmissions";
import TopicChart from "../components/dsa/TopicChart";
import DifficultyChart from "../components/dsa/DifficultyChart";

const PLATFORM_LIST = [
  { key: "leetcode", name: "LeetCode" },
  { key: "codeforces", name: "Codeforces" },
  { key: "codechef", name: "CodeChef" },
  { key: "gfg", name: "GeeksforGeeks" },
];

function DsaStats() {
  const { stats, isLoading, error, refetch, sync, isSyncing, syncError } =
    useDsaStats();

   const contests = useUpcomingContests();
   const recent = useRecentSubmissions();
  const [platformsOpen, setPlatformsOpen] = useState(false);

  const totals = stats?.totals;

  const cards = [
    { label: "Total Solved", value: totals?.solved, icon: CheckCircle2 },
    { label: "Active Days", value: totals?.activeDays, icon: CalendarDays },
    { label: "Current Streak", value: totals?.currentStreak, icon: Flame },
    { label: "Max Streak", value: totals?.maxStreak, icon: Trophy },
  ];

  const handleSavePlatforms = async (handles) => {
    await updateDsaPlatforms(handles);
    setPlatformsOpen(false);
    refetch();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-ink">DSA Statistics</h1>
          <p className="mt-1 text-sm text-ink-muted">
            {stats?.lastSyncedAt
              ? `Last synced ${new Date(stats.lastSyncedAt).toLocaleString("en-IN", {
                  day: "numeric",
                  month: "short",
                  hour: "numeric",
                  minute: "2-digit",
                })}`
              : "Your progress across coding platforms."}
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => setPlatformsOpen(true)}
            disabled={isLoading}
          >
            <Link2 size={16} />
            Connect platforms
          </Button>

          <Button
            variant="secondary"
            onClick={sync}
            disabled={isSyncing || isLoading}
          >
            <RefreshCw size={16} className={isSyncing ? "animate-spin" : ""} />
            {isSyncing ? "Syncing..." : "Refresh Now"}
          </Button>
        </div>
      </div>

      {syncError && (
        <p className="rounded-lg bg-status-rejected/15 px-3 py-2 text-sm text-status-rejected">
          {syncError}
        </p>
      )}

      {error ? (
        <Card className="flex items-center justify-between gap-4 p-5">
          <p className="text-sm text-status-rejected">{error}</p>
          <Button variant="secondary" size="sm" onClick={refetch}>
            Retry
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {cards.map((card) => (
            <StatCard key={card.label} {...card} isLoading={isLoading} />
          ))}
        </div>
      )}

      {!error && (
        <ActivityHeatmap
          activity={stats?.activity ?? []}
          isLoading={isLoading}
        />
      )}
            {!error && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {PLATFORM_LIST.map(({ key, name }) =>
            isLoading ? (
              <Skeleton key={key} className="h-56 rounded-xl" />
            ) : (
              <PlatformCard
                key={key}
                name={name}
                data={stats?.platforms?.[key]}
                onConnect={() => setPlatformsOpen(true)}
              />
            )
          )}
        </div>
      )}

      {!error && (
        <div className="grid gap-4 lg:grid-cols-2">
          <TopicChart
            topics={stats?.platforms?.leetcode?.topics ?? []}
            isLoading={isLoading}
          />
          <DifficultyChart totals={totals} isLoading={isLoading} />
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <UpcomingContests
          contests={contests.contests}
          isLoading={contests.isLoading}
          error={contests.error}
        />
        <RecentSubmissions
          submissions={recent.submissions}
          isLoading={recent.isLoading}
          error={recent.error}
        />
      </div>

      <PlatformsModal
        open={platformsOpen}
        handles={stats?.handles}
        onClose={() => setPlatformsOpen(false)}
        onSubmit={handleSavePlatforms}
      />
    </div>
  );
}

export default DsaStats;