import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import MobileTopbar from "../components/layout/MobileTopbar";

function AppLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = () => setDrawerOpen(false);

  useEffect(() => {
    if (!drawerOpen) return;

    const onKeyDown = (e) => e.key === "Escape" && setDrawerOpen(false);
    const previousOverflow = document.body.style.overflow;

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [drawerOpen]);

  return (
    <div className="flex min-h-screen bg-canvas text-ink">
      {/* Desktop: a sticky column inside the flex row, so it takes real space. */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 lg:block">
        <Sidebar />
      </aside>

      {/* Mobile: off-canvas drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          drawerOpen ? "visible" : "invisible"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/70 transition-opacity ${
            drawerOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeDrawer}
          aria-hidden="true"
        />

        <aside
          className={`absolute inset-y-0 left-0 w-64 transition-transform duration-200 ${
            drawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar onNavigate={closeDrawer} />
        </aside>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <MobileTopbar onMenuClick={() => setDrawerOpen(true)} />

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;