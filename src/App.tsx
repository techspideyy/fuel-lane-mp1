import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { navItems } from "./nav-items";
import Auth from "./pages/auth/Auth";
import AuthRedirect from "./components/auth/AuthRedirect";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, authLoading } = useAuth();
  
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
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <AuthRedirect>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        {navItems.map(({ to, page }) => (
          <Route 
            key={to} 
            path={to} 
            element={
              to === "/" || to.startsWith("/auth") ? page : <ProtectedRoute>{page}</ProtectedRoute>
            } 
          />
        ))}
      </Routes>
    </AuthRedirect>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;