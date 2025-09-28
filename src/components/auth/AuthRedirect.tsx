import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface AuthRedirectProps {
  children: React.ReactNode;
}

const AuthRedirect = ({ children }: AuthRedirectProps) => {
  const { user, profile, authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect if user is authenticated and has a profile
    if (user && profile && !authLoading) {
      const dashboardRoutes = {
        user: '/dashboard/user',
        driver: '/dashboard/driver',
        mechanic: '/dashboard/mechanic',
        admin: '/dashboard/admin'
      };
      
      const targetRoute = dashboardRoutes[profile.role as keyof typeof dashboardRoutes] || '/dashboard/user';
      
      // Only redirect if we're currently on an auth page, not the landing page
      const currentPath = window.location.pathname;
      if (currentPath.startsWith('/auth')) {
        navigate(targetRoute, { replace: true });
      }
    }
  }, [user, profile, authLoading, navigate]);

  return <>{children}</>;
};

export default AuthRedirect;