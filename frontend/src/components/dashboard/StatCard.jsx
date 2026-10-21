import Card from "../ui/Card";
import Skeleton from "../ui/Skeleton";

function StatCard({ label, value, isLoading }) {
  return (
    <Card className="p-5">
      <p className="text-xs text-ink-muted">{label}</p>

      {isLoading ? (
        <Skeleton className="mt-3 h-8 w-14" />
      ) : (
        <p className="mt-2 font-mono text-3xl text-ink">{value ?? 0}</p>
      )}
    </Card>
  );
}

export default StatCard;