import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Fuel, 
  Wrench, 
  Truck, 
  MapPin, 
  CreditCard, 
  Bell, 
  Users, 
  BarChart3, 
  Settings,
  Calendar,
  Package,
  MessageCircle,
  Star,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  userRole: "user" | "driver" | "mechanic" | "admin";
}

const navigationItems = {
  user: [
    { icon: Home, label: "Dashboard", href: "/dashboard/user" },
    { icon: Fuel, label: "Order Fuel", href: "/dashboard/user/fuel" },
    { icon: Wrench, label: "Garage Services", href: "/dashboard/user/garage" },
    { icon: MapPin, label: "Track Orders", href: "/dashboard/user/tracking" },
    { icon: CreditCard, label: "Payments", href: "/dashboard/user/payments" },
    { icon: Bell, label: "Notifications", href: "/dashboard/user/notifications" },
    { icon: Star, label: "Reviews", href: "/dashboard/user/reviews" },
    { icon: Settings, label: "Settings", href: "/dashboard/user/settings" },
  ],
  driver: [
    { icon: Home, label: "Dashboard", href: "/dashboard/driver" },
    { icon: MapPin, label: "Active Deliveries", href: "/dashboard/driver/deliveries" },
    { icon: Calendar, label: "Schedule", href: "/dashboard/driver/schedule" },
    { icon: Truck, label: "Vehicle Status", href: "/dashboard/driver/vehicle" },
    { icon: BarChart3, label: "Earnings", href: "/dashboard/driver/earnings" },
    { icon: Bell, label: "Notifications", href: "/dashboard/driver/notifications" },
    { icon: Settings, label: "Settings", href: "/dashboard/driver/settings" },
  ],
  mechanic: [
    { icon: Home, label: "Dashboard", href: "/dashboard/mechanic" },
    { icon: Calendar, label: "Appointments", href: "/dashboard/mechanic/appointments" },
    { icon: Wrench, label: "Services", href: "/dashboard/mechanic/services" },
    { icon: Package, label: "Inventory", href: "/dashboard/mechanic/inventory" },
    { icon: Users, label: "Customers", href: "/dashboard/mechanic/customers" },
    { icon: BarChart3, label: "Reports", href: "/dashboard/mechanic/reports" },
    { icon: Bell, label: "Notifications", href: "/dashboard/mechanic/notifications" },
    { icon: Settings, label: "Settings", href: "/dashboard/mechanic/settings" },
  ],
  admin: [
    { icon: Home, label: "Dashboard", href: "/dashboard/admin" },
    { icon: Users, label: "User Management", href: "/dashboard/admin/users" },
    { icon: Fuel, label: "Fuel Management", href: "/dashboard/admin/fuel" },
    { icon: Wrench, label: "Service Management", href: "/dashboard/admin/services" },
    { icon: Package, label: "Inventory", href: "/dashboard/admin/inventory" },
    { icon: BarChart3, label: "Analytics", href: "/dashboard/admin/analytics" },
    { icon: CreditCard, label: "Payments", href: "/dashboard/admin/payments" },
    { icon: MessageCircle, label: "Support", href: "/dashboard/admin/support" },
    { icon: Settings, label: "Settings", href: "/dashboard/admin/settings" },
  ],
};

export const Sidebar = ({ userRole }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const items = navigationItems[userRole];

  return (
    <div className={cn(
      "bg-card border-r border-border flex flex-col transition-all duration-300 shadow-soft",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-fuel-gradient rounded-lg flex items-center justify-center">
                <Fuel className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">FuelPro</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {items.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link key={item.href} to={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start h-10 transition-colors",
                    collapsed ? "px-2" : "px-3",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  <item.icon className={cn("w-5 h-5", collapsed ? "" : "mr-2")} />
                  {!collapsed && <span>{item.label}</span>}
                </Button>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Role Badge */}
      {!collapsed && (
        <div className="p-4 border-t border-border">
          <div className="bg-muted rounded-lg p-3 text-center">
            <p className="text-sm font-medium capitalize">{userRole}</p>
            <p className="text-xs text-muted-foreground">Dashboard</p>
          </div>
        </div>
      )}
    </div>
  );
};