import Card from "../ui/Card";
import Skeleton from "../ui/Skeleton";

function StatCard({ label, value, icon: Icon, isLoading }) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs text-ink-muted">{label}</p>
        {Icon && <Icon size={16} className="text-ink-faint" />}
      </div>

      {isLoading ? (
        <Skeleton className="mt-3 h-8 w-14" />
      ) : (
        <p className="mt-2 font-mono text-3xl text-ink">{value ?? 0}</p>
      )}
    </Card>
  );
}

export default StatCard;