import { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";
import { useAuth } from "@/hooks/useAuth";

type DashboardLayoutProps = {
  userRole?: "user" | "driver" | "mechanic" | "admin"; // Option A: override role
  children: ReactNode; // allow children
};

export const DashboardLayout = ({
  userRole,
  children,
}: DashboardLayoutProps) => {
  const { user } = useAuth();

  // If userRole prop was passed → override
  const roleFromAuth =
    (user?.role as "user" | "driver" | "mechanic" | "admin") ?? "user";

  const finalRole = userRole ?? roleFromAuth;

  return (
    <div className="flex h-screen bg-background">
      <Sidebar userRole={finalRole} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav userRole={finalRole} />

        <main className="flex-1 overflow-y-auto p-6 bg-muted/30">
          {children}
        </main>
      </div>
    </div>
  );
};
