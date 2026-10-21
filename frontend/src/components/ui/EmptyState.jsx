function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center px-6 py-12 text-center">
      {Icon && (
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-surface-raised text-ink-muted">
          <Icon size={20} />
        </div>
      )}

      <h3 className="text-sm font-medium text-ink">{title}</h3>

      {description && (
        <p className="mt-1 max-w-xs text-sm text-ink-muted">{description}</p>
      )}

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export default EmptyState;