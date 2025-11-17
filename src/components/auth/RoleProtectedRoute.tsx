import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const RoleProtectedRoute = ({
  allowedRoles,
  children,
}: {
  allowedRoles: string[];
  children: React.ReactNode;
}) => {
  const { profile, authLoading } = useAuth();

  if (authLoading) return null; // or a loader

  if (!profile || !allowedRoles.includes(profile.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RoleProtectedRoute;
