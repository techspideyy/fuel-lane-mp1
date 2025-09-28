import { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";

interface DashboardLayoutProps {
  children: ReactNode;
  userRole: "user" | "driver" | "mechanic" | "admin";
}

export const DashboardLayout = ({ children, userRole }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar userRole={userRole} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav userRole={userRole} />
        <main className="flex-1 overflow-y-auto p-6 bg-muted/30">
          {children}
        </main>
      </div>
    </div>
  );
};