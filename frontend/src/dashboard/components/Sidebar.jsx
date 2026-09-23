import { useLocation } from "react-router-dom";
import {
  LayoutGrid,
  Code2,
  Swords,
  Layers,
  Send,
  Mic,
  Award,
  BarChart2,
  Settings,
  LogOut,
  X,
} from "lucide-react";

const NAV_GROUPS = [
  {
    label: "Main",
    items: [
      {
        key: "overview",
        label: "Overview",
        icon: LayoutGrid,
        path: "/dashboard",
      },
    ],
  },
  {
    label: "Preparation",
    items: [
      { key: "dsa", label: "DSA", icon: Code2 },
      { key: "cp", label: "Competitive Programming", icon: Swords },
      { key: "development", label: "Development", icon: Layers },
    ],
  },
  {
    label: "Placement",
    items: [
      { key: "applications", label: "Applications", icon: Send },
      { key: "interviews", label: "Interviews", icon: Mic },
      { key: "offers", label: "Offers", icon: Award },
    ],
  },
  {
    label: "Other",
    items: [
      { key: "analytics", label: "Analytics", icon: BarChart2 },
      { key: "settings", label: "Settings", icon: Settings },
    ],
  },
];

function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      <button
        type="button"
        aria-label="Close navigation"
        className={`dashboard-backdrop ${isOpen ? "is-open" : ""}`}
        onClick={onClose}
      />
      <aside
        className={`dashboard-sidebar fixed left-0 top-0 h-screen w-60 shrink-0 border-r
      border-[var(--dsh-border)] bg-[var(--dsh-surface)] flex flex-col
      overflow-y-auto ${isOpen ? "is-open" : ""}`}
      >
        <div className="dashboard-brand px-5 py-5 border-b border-[var(--dsh-border)]">
          <span className="dashboard-brand-mark">PT</span>
          <span className="text-[15px] font-bold tracking-[-0.3px] text-[var(--dsh-ink)]">
            Placement Tracker
          </span>
          <button
            type="button"
            aria-label="Close navigation"
            className="dashboard-sidebar-close"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-5">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <div className="px-2 mb-2 text-[10.5px] font-semibold tracking-[2px] uppercase text-[var(--dsh-muted)]">
                {group.label}
              </div>
              <div className="flex flex-col gap-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.path && location.pathname === item.path;
                  const className = `flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[13px] font-medium transition-colors ${
                    isActive
                      ? "bg-[var(--dsh-ink)] text-[var(--dsh-surface)]"
                      : "text-[var(--dsh-muted)] hover:text-[var(--dsh-ink)] hover:bg-[var(--dsh-bg)]"
                  }`;

                  if (item.path) {
                    return (
                      <a key={item.key} href={item.path} className={className}>
                        <Icon size={16} strokeWidth={1.8} />
                        {item.label}
                      </a>
                    );
                  }

                  // Not wired up yet — page doesn't exist until the backend
                  // work for that section is ready.
                  return (
                    <button key={item.key} type="button" className={className}>
                      <Icon size={16} strokeWidth={1.8} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-[var(--dsh-border)] flex flex-col gap-0.5">
          <button
            type="button"
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[13px] font-medium text-[var(--dsh-muted)] hover:text-[var(--dsh-ink)] hover:bg-[var(--dsh-bg)] transition-colors"
          >
            <LogOut size={16} strokeWidth={1.8} />
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
