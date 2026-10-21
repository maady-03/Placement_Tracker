import useAuth from "../hooks/useAuth";
import useDashboardStats from "../hooks/useDashboardStats";
import useApplications from "../hooks/useApplications";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import StatCard from "../components/dashboard/StatCard";
import RecentApplications from "../components/dashboard/RecentApplications";
import UpcomingDeadlines from "../components/dashboard/UpcomingDeadlines";

function Dashboard() {
  const { user } = useAuth();
  const { stats, isLoading, error, refetch } = useDashboardStats();
  const recent = useApplications({ limit: 5 });

  const cards = [
    { label: "Total Apps", value: stats?.totalApplications },
    { label: "Applied", value: stats?.byStatus?.applied },
    { label: "OA", value: stats?.byStatus?.oa },
    { label: "Interview", value: stats?.byStatus?.interview },
    { label: "Offer", value: stats?.byStatus?.offer },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink">
          Hi, {user?.firstName}
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          Here is where your placement search stands.
        </p>
      </div>

      {error ? (
        <Card className="flex items-center justify-between gap-4 p-5">
          <p className="text-sm text-status-rejected">{error}</p>
          <Button variant="secondary" size="sm" onClick={refetch}>
            Retry
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
          {cards.map((card) => (
            <StatCard key={card.label} {...card} isLoading={isLoading} />
          ))}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentApplications
            applications={recent.applications}
            isLoading={recent.isLoading}
            error={recent.error}
          />
        </div>

        {!error && (
          <UpcomingDeadlines
            applications={stats?.upcoming?.applications ?? []}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;