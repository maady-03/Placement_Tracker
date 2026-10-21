import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";
import Card from "./components/ui/Card";

import Landing from "./landing/Landing";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import NewApplication from "./pages/NewApplication";
import ApplicationDetail from "./pages/ApplicationDetail";

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
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/applications/new" element={<NewApplication />} />
              <Route path="/applications/:id" element={<ApplicationDetail />} />
              <Route
                path="/companies"
                element={<Placeholder title="Companies" />}
              />
              <Route
                path="/dsa-stats"
                element={<Placeholder title="DSA Stats" />}
              />
              <Route path="/skills" element={<Placeholder title="Skills" />} />
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
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
