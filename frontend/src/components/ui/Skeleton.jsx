function Skeleton({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md bg-surface-raised ${className}`}
    />
  );
}

export default Skeleton;