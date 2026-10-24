import { Outlet } from "react-router-dom";

function OnboardingLayout() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-canvas px-4 py-10 text-ink sm:justify-center">
      <div className="mb-8 flex items-center gap-2 text-sm font-semibold">
        <span className="h-2.5 w-2.5 rounded-sm bg-accent" />
        <span>
          Placement <span className="text-accent">Tracker</span>
        </span>
      </div>

      <main className="w-full max-w-lg">
        <Outlet />
      </main>
    </div>
  );
}

export default OnboardingLayout;