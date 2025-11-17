import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Fuel,
  Wrench,
  Package,
  BarChart3,
  CreditCard,
  HeadphonesIcon,
  Settings,
  AlertTriangle,
  TrendingUp,
  Truck,
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const platformStats = {
    totalUsers: 1247,
    activeDrivers: 89,
    totalRevenue: 10571358.0,
    dailyOrders: 324,
  };

  const recentAlerts = [
    {
      id: 1,
      type: "fuel",
      message: "Low fuel inventory at Downtown depot",
      severity: "high",
      time: "2 min ago",
    },
    {
      id: 2,
      type: "driver",
      message: "Driver #DR-089 reported vehicle issue",
      severity: "medium",
      time: "15 min ago",
    },
    {
      id: 3,
      type: "payment",
      message: "Payment gateway showing increased latency",
      severity: "low",
      time: "1 hour ago",
    },
  ];

  const topPerformers = [
    {
      name: "Mike Johnson",
      role: "Driver",
      metric: "97% rating",
      earnings: "₹205800",
    },
    {
      name: "Sarah Smith",
      role: "Mechanic",
      metric: "4.9★ rating",
      services: "156 services",
    },
    {
      name: "Alex Brown",
      role: "Driver",
      metric: "285 deliveries",
      earnings: "₹262080",
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-destructive text-destructive-foreground";
      case "medium":
        return "bg-secondary text-secondary-foreground";
      case "low":
        return "bg-accent text-accent-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "fuel":
        return <Fuel className="w-4 h-4" />;
      case "driver":
        return <Truck className="w-4 h-4" />;
      case "payment":
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  // ---------------------------
  // MAIN DASHBOARD CONTENT
  // ---------------------------

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{platformStats.totalUsers}</p>
              </div>
              <Users className="w-8 h-8 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Drivers</p>
                <p className="text-2xl font-bold">{platformStats.activeDrivers}</p>
              </div>
              <Truck className="w-8 h-8 text-green-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">
                  ₹{(platformStats.totalRevenue / 100000).toFixed(1)}L
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Daily Orders</p>
                <p className="text-2xl font-bold">{platformStats.dailyOrders}</p>
              </div>
              <Package className="w-8 h-8 text-orange-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Management Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          className="hover:shadow-lg transition-shadow cursor-pointer group"
          onClick={() => navigate("/dashboard/admin/users")}
        >
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">User Management</h3>
            <p className="text-sm text-muted-foreground">Manage users and roles</p>
          </CardContent>
        </Card>

        <Card
          className="hover:shadow-lg transition-shadow cursor-pointer group"
          onClick={() => navigate("/dashboard/admin/fuel")}
        >
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Fuel className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Fuel Management</h3>
            <p className="text-sm text-muted-foreground">Manage fuel inventory</p>
          </CardContent>
        </Card>

        <Card
          className="hover:shadow-lg transition-shadow cursor-pointer group"
          onClick={() => navigate("/dashboard/admin/services")}
        >
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Wrench className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Service Management</h3>
            <p className="text-sm text-muted-foreground">Manage garage services</p>
          </CardContent>
        </Card>

        <Card
          className="hover:shadow-lg transition-shadow cursor-pointer group"
          onClick={() => navigate("/dashboard/admin/inventory")}
        >
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Package className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Inventory</h3>
            <p className="text-sm text-muted-foreground">Manage inventory stock</p>
          </CardContent>
        </Card>

        <Card
          className="hover:shadow-lg transition-shadow cursor-pointer group"
          onClick={() => navigate("/dashboard/admin/analytics")}
        >
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="font-semibold mb-2">Analytics</h3>
            <p className="text-sm text-muted-foreground">View platform analytics</p>
          </CardContent>
        </Card>

        <Card
          className="hover:shadow-lg transition-shadow cursor-pointer group"
          onClick={() => navigate("/dashboard/admin/payments")}
        >
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <CreditCard className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="font-semibold mb-2">Payments</h3>
            <p className="text-sm text-muted-foreground">Manage payments</p>
          </CardContent>
        </Card>

        <Card
          className="hover:shadow-lg transition-shadow cursor-pointer group"
          onClick={() => navigate("/dashboard/admin/support")}
        >
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <HeadphonesIcon className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="font-semibold mb-2">Support</h3>
            <p className="text-sm text-muted-foreground">Customer support</p>
          </CardContent>
        </Card>

        <Card
          className="hover:shadow-lg transition-shadow cursor-pointer group"
          onClick={() => navigate("/dashboard/admin/settings")}
        >
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Settings className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="font-semibold mb-2">Settings</h3>
            <p className="text-sm text-muted-foreground">Platform settings</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts & Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-4 p-3 bg-muted/50 rounded-lg"
              >
                <div className="mt-1">{getAlertIcon(alert.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Performers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topPerformers.map((performer, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-sm">{performer.name}</p>
                  <p className="text-xs text-muted-foreground">{performer.role}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">{performer.metric}</p>

                  {performer.earnings && (
                    <p className="text-xs text-green-600">
                      {performer.earnings}
                    </p>
                  )}

                  {performer.services && (
                    <p className="text-xs text-blue-600">{performer.services}</p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default AdminDashboard;
