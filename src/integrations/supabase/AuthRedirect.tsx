// src/components/auth/AuthRedirect.tsx
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface AuthRedirectProps {
  children: React.ReactNode;
}

const AuthRedirect: React.FC<AuthRedirectProps> = ({ children }) => {
  const { profile, authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("🔁 AuthRedirect effect:");
    console.log("   authLoading:", authLoading);
    console.log("   profile:", profile);
    console.log("   currentPath:", location.pathname);

    // 1) Wait until auth finished
    if (authLoading) {
      console.log("⏳ AuthRedirect: still loading, do nothing");
      return;
    }

    // 2) If no profile yet → don't redirect (stay on auth or landing)
    if (!profile) {
      console.log("⚪ AuthRedirect: no profile, no redirect");
      return;
    }

    // 3) If already on a dashboard URL, don't redirect again
    if (location.pathname.startsWith("/dashboard")) {
      console.log("⚪ AuthRedirect: already on dashboard, skip redirect");
      return;
    }

    // 4) Only auto-redirect when on an /auth route
    if (!location.pathname.startsWith("/auth")) {
      console.log("⚪ AuthRedirect: not on /auth, skip redirect");
      return;
    }

    // 5) Decide target based on role (default → user)
    const role = profile.role || profile.user_metadata?.role || "user";

    const dashboardRoutes: Record<string, string> = {
      user: "/dashboard/user",
      driver: "/dashboard/driver",
      mechanic: "/dashboard/mechanic",
      admin: "/dashboard/admin",
    };

    const target = dashboardRoutes[role] || "/dashboard/user";

    console.log(`✅ AuthRedirect: redirecting to ${target} for role:`, role);
    navigate(target, { replace: true });
  }, [profile, authLoading, location.pathname, navigate]);

  return <>{children}</>;
};

export default AuthRedirect;
