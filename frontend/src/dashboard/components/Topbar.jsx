import { Menu, Search, Bell, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const THEME_OPTIONS = [
  { value: "light", icon: Sun, label: "Light" },
  { value: "dark", icon: Moon, label: "Dark" },
  { value: "system", icon: Monitor, label: "System" },
];

function ThemeToggle() {
  const { theme, isSystem, setTheme } = useTheme();
  const active = isSystem ? "system" : theme;

  return (
    <div className="flex items-center gap-0.5 p-0.5 rounded-md border border-[var(--dsh-border)]">
      {THEME_OPTIONS.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          type="button"
          title={label}
          onClick={() => setTheme(value)}
          className={`flex items-center justify-center w-7 h-7 rounded-[5px] transition-colors ${
            active === value
              ? "bg-[var(--dsh-ink)] text-[var(--dsh-surface)]"
              : "text-[var(--dsh-muted)] hover:text-[var(--dsh-ink)]"
          }`}
        >
          <Icon size={14} strokeWidth={1.8} />
        </button>
      ))}
    </div>
  );
}

function Topbar({ studentName, lastUpdated, onMenuToggle }) {
  return (
    <header
      className="dashboard-topbar sticky top-0 z-10 h-16 flex items-center justify-between
      px-7 border-b border-[var(--dsh-border)] bg-[var(--dsh-surface)]"
    >
      <div>
        <button
          type="button"
          aria-label="Open navigation"
          className="dashboard-menu-button"
          onClick={onMenuToggle}
        >
          <Menu size={18} />
        </button>
        <h1 className="text-[15px] font-bold tracking-[-0.2px] text-[var(--dsh-ink)]">
          Overview
        </h1>
        <p className="text-[12px] text-[var(--dsh-muted)]">{lastUpdated}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex items-center justify-center w-9 h-9 rounded-md text-[var(--dsh-muted)] hover:text-[var(--dsh-ink)] hover:bg-[var(--dsh-bg)] transition-colors"
        >
          <Search size={16} strokeWidth={1.8} />
        </button>
        <button
          type="button"
          className="flex items-center justify-center w-9 h-9 rounded-md text-[var(--dsh-muted)] hover:text-[var(--dsh-ink)] hover:bg-[var(--dsh-bg)] transition-colors"
        >
          <Bell size={16} strokeWidth={1.8} />
        </button>

        <ThemeToggle />

        <div className="w-8 h-8 ml-1 rounded-full bg-[var(--dsh-ink)] text-[var(--dsh-surface)] flex items-center justify-center text-[11px] font-semibold tracking-[0.5px]">
          {studentName?.slice(0, 2).toUpperCase()}
        </div>
      </div>
    </header>
  );
}

export default Topbar;
