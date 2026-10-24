import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { isProfileComplete } from "../utils/profile";

// Sits inside ProtectedRoute, so `user` is already loaded here.
function ProfileGate() {
  const { user } = useAuth();

  if (!isProfileComplete(user)) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
}

export default ProfileGate;