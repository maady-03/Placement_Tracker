import { NavLink } from "react-router-dom";

function SidebarItem({ to, icon: Icon, label, onNavigate }) {
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
          isActive
            ? "bg-accent/10 font-medium text-accent"
            : "text-ink-muted hover:bg-surface-raised hover:text-ink"
        }`
      }
    >
      <Icon size={18} className="shrink-0" />
      <span className="truncate">{label}</span>
    </NavLink>
  );
}

export default SidebarItem;