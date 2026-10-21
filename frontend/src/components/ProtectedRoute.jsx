import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function SessionSkeleton() {
  return (
    <div className="flex min-h-screen bg-canvas">
      <div className="hidden w-60 shrink-0 border-r border-line bg-surface lg:block" />
      <div className="flex-1 space-y-4 p-8">
        <div className="h-7 w-48 animate-pulse rounded-md bg-surface-raised" />
        <div className="h-32 animate-pulse rounded-xl bg-surface" />
      </div>
    </div>
  );
}

function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <SessionSkeleton />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default ProtectedRoute;
