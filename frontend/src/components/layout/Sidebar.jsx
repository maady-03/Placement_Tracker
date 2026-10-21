import {
  LayoutDashboard,
  Briefcase,
  Building2,
  Code2,
  Wrench,
  UserCircle,
  Settings,
  LogOut,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import SidebarItem from "./SidebarItem";

const NAV_SECTIONS = [
  {
    title: "Main",
    items: [
      { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { to: "/applications", icon: Briefcase, label: "Applications" },
      { to: "/companies", icon: Building2, label: "Companies" },
    ],
  },
  {
    title: "Prep",
    items: [
      { to: "/dsa-stats", icon: Code2, label: "DSA Stats" },
      { to: "/skills", icon: Wrench, label: "Skills" },
    ],
  },
  {
    title: "Profile",
    items: [
      { to: "/profile", icon: UserCircle, label: "Preview" },
      { to: "/settings", icon: Settings, label: "Settings" },
    ],
  },
];

// Fills its parent. AppLayout decides width and position.
function Sidebar({ onNavigate }) {
  const { user, logout } = useAuth();

  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");
  const initial = user?.firstName?.[0]?.toUpperCase() ?? "?";

  return (
    <div className="flex h-full flex-col border-r border-line bg-surface">
      <div className="flex h-16 shrink-0 items-center gap-2 px-5">
        <span className="h-2.5 w-2.5 rounded-sm bg-accent" />
        <span className="text-sm font-semibold text-ink">
          Placement <span className="text-accent">Tracker</span>
        </span>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title}>
            <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-widest text-ink-faint">
              {section.title}
            </p>

            <div className="space-y-0.5">
              {section.items.map((item) => (
                <SidebarItem key={item.to} {...item} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="flex shrink-0 items-center gap-3 border-t border-line p-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
          {initial}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-ink">{fullName}</p>
          <p className="truncate text-xs text-ink-muted">@{user?.username}</p>
        </div>

        <button
          type="button"
          onClick={logout}
          aria-label="Log out"
          className="rounded-md p-1.5 text-ink-muted hover:bg-surface-raised hover:text-ink"
        >
          <LogOut size={16} />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;