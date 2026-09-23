import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { dashboardData } from "./data/dashboardMockData";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import PlacementReadiness from "./components/PlacementReadiness";
import QuickStats from "./components/QuickStats";
import DSAProgress from "./components/DSAProgress";
import ApplicationPipeline from "./components/ApplicationPipeline";
import WeeklyGoals from "./components/WeeklyGoals";
import Upcoming from "./components/Upcoming";
import RecentActivity from "./components/RecentActivity";
import PlacementJourney from "./components/PlacementJourney";
import "./Dashboard.css";

function Dashboard() {
  // `dashboardData` is the mock stand-in for a future API response.
  // Swap this for the result of a fetch/hook later — the components
  // below only care that they receive the same shape through props.
  const data = dashboardData;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="dashboard-shell min-h-screen bg-[var(--dsh-bg)]">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="dashboard-app">
          <Topbar
            studentName={data.meta.studentName}
            lastUpdated={data.meta.lastUpdated}
            onMenuToggle={() => setSidebarOpen((open) => !open)}
          />

          <main className="dashboard-content">
            <div className="dashboard-page-heading mb-6">
              <div>
                <p className="dashboard-kicker">Student dashboard</p>
                <h2 className="text-xl font-bold tracking-[-0.3px] text-[var(--dsh-ink)]">
                  Good evening, {data.meta.studentName}
                </h2>
                <p className="text-[13px] text-[var(--dsh-muted)] mt-0.5">
                  Here's your placement preparation overview.
                </p>
              </div>
              <div className="dashboard-status-pill">
                <span className="dashboard-status-dot" />
                Preparation in progress
              </div>
            </div>

            <div className="dashboard-stats mb-5">
              <QuickStats data={data.stats} />
            </div>

            <div className="dashboard-grid mb-5">
              <div className="dashboard-primary-column flex flex-col gap-4 min-w-0">
                <PlacementReadiness data={data.readiness} />
                <DSAProgress data={data.dsaProgress} />
                <RecentActivity data={data.recentActivity} />
              </div>

              <div className="dashboard-secondary-column flex flex-col gap-4 min-w-0">
                <ApplicationPipeline data={data.applicationPipeline} />
                <WeeklyGoals data={data.weeklyGoals} />
                <Upcoming data={data.upcoming} />
              </div>
            </div>

            <PlacementJourney data={data.journey} />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Dashboard;
