import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfileGate from "./components/ProfileGate";
import AppLayout from "./layouts/AppLayout";
import OnboardingLayout from "./layouts/OnboardingLayout";
import Card from "./components/ui/Card";

import Landing from "./landing/Landing";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import NewApplication from "./pages/NewApplication";
import ApplicationDetail from "./pages/ApplicationDetail";
import EditApplication from "./pages/EditApplication";
import Companies from "./pages/Companies";
import CompanyDetail from "./pages/CompanyDetail";
import DsaStats from "./pages/DsaStats";
import Contests from "./pages/Contests";

// Temporary: each placeholder is replaced by a real page as we build it.
function Placeholder({ title }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink">{title}</h1>
      <Card className="mt-6 p-5 text-sm text-ink-muted">
        {title} page placeholder.
      </Card>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<OnboardingLayout />}>
              <Route path="/onboarding" element={<Onboarding />} />
            </Route>

            <Route element={<ProfileGate />}>
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/applications" element={<Applications />} />
                <Route path="/applications/new" element={<NewApplication />} />
                <Route path="/applications/:id" element={<ApplicationDetail />} />
                <Route
                  path="/applications/:id/edit"
                  element={<EditApplication />}
                />
                <Route path="/companies" element={<Companies />} />
                <Route path="/companies/:id" element={<CompanyDetail />} />
                <Route path="/dsa-stats" element={<DsaStats />} />
                <Route path="/contests" element={<Contests />} />
                <Route
                  path="/skills"
                  element={<Placeholder title="Skills" />}
                />
                <Route
                  path="/profile"
                  element={<Placeholder title="Preview" />}
                />
                <Route
                  path="/settings"
                  element={<Placeholder title="Settings" />}
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;