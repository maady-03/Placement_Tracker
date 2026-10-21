import { Menu } from "lucide-react";

// Visible below the `lg` breakpoint only. AppLayout owns the drawer state.
function MobileTopbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-line bg-surface px-4 lg:hidden">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
        className="rounded-md p-1.5 text-ink-muted hover:bg-surface-raised hover:text-ink"
      >
        <Menu size={20} />
      </button>

      <span className="flex items-center gap-2 text-sm font-semibold text-ink">
        <span className="h-2.5 w-2.5 rounded-sm bg-accent" />
        Placement <span className="text-accent">Tracker</span>
      </span>
    </header>
  );
}

export default MobileTopbar;