import { useAuth } from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: ('user' | 'driver' | 'mechanic' | 'admin')[];
}

const RoleProtectedRoute = ({ children, allowedRoles }: RoleProtectedRouteProps) => {
  const { user, profile, authLoading } = useAuth();
  const location = useLocation();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!profile || !allowedRoles.includes(profile.role)) {
    // Redirect to appropriate dashboard based on user's role
    const dashboardRoutes = {
      user: '/dashboard/user',
      driver: '/dashboard/driver',
      mechanic: '/dashboard/mechanic',
      admin: '/dashboard/admin'
    };

    // If profile exists, use the user's actual role, otherwise default to user dashboard
    const userRole = profile?.role || 'user';
    const userDashboard = dashboardRoutes[userRole as keyof typeof dashboardRoutes] || '/dashboard/user';
    return <Navigate to={userDashboard} replace />;
  }

  return <>{children}</>;
};

export default RoleProtectedRoute;