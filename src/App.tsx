// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "@/hooks/useAuth";
import AuthRedirect from "@/integrations/supabase/AuthRedirect";
import RoleProtectedRoute from "@/components/auth/RoleProtectedRoute";

import Landing from "@/pages/Landing";
import NotFound from "@/pages/NotFound";

import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import AuthPage from "@/pages/auth/Auth";

import UserDashboard from "@/pages/dashboards/UserDashboard";
import DriverDashboard from "@/pages/dashboards/DriverDashboard";
import MechanicDashboard from "@/pages/dashboards/MechanicDashboard";
import AdminDashboard from "@/pages/dashboards/AdminDashboard";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        <Routes>

          {/* Public */}
          <Route path="/" element={<Landing />} />

          {/* Auth */}
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />

          {/* REQUIRED FOR SUPABASE */}
          <Route path="/auth/callback" element={<AuthRedirect />} />

          {/* Dashboards */}
          <Route
            path="/dashboard/user"
            element={
              <RoleProtectedRoute allowedRoles={["user"]}>
                <UserDashboard />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/dashboard/driver"
            element={
              <RoleProtectedRoute allowedRoles={["driver"]}>
                <DriverDashboard />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/dashboard/mechanic"
            element={
              <RoleProtectedRoute allowedRoles={["mechanic"]}>
                <MechanicDashboard />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/dashboard/admin"
            element={
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </RoleProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
