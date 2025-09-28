import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Fuel, 
  Truck, 
  IndianRupee, 
  TrendingUp, 
  AlertTriangle,
  BarChart3,
  Settings,
  MapPin,
  MessageCircle,
  Star,
  Package
} from "lucide-react";

const AdminDashboard = () => {
  const platformStats = {
    totalUsers: 1247,
    activeDrivers: 89,
    totalRevenue: 10571358.00,
    dailyOrders: 324
  };

  const recentAlerts = [
    {
      id: 1,
      type: "fuel",
      message: "Low fuel inventory at Downtown depot",
      severity: "high",
      time: "2 min ago"
    },
    {
      id: 2,
      type: "driver",
      message: "Driver #DR-089 reported vehicle issue",
      severity: "medium", 
      time: "15 min ago"
    },
    {
      id: 3,
      type: "payment",
      message: "Payment gateway showing increased latency",
      severity: "low",
      time: "1 hour ago"
    }
  ];

  const topPerformers = [
    { name: "Mike Johnson", role: "Driver", metric: "97% rating", earnings: "₹205800" },
    { name: "Sarah Smith", role: "Mechanic", metric: "4.9★ rating", services: "156 services" },
    { name: "Alex Brown", role: "Driver", metric: "285 deliveries", earnings: "₹262080" }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-secondary text-secondary-foreground";
      case "low": return "bg-accent text-accent-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "fuel": return <Fuel className="w-4 h-4" />;
      case "driver": return <Truck className="w-4 h-4" />;
      case "payment": return <IndianRupee className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* Admin Header */}
        <div className="bg-fuel-gradient rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-white/90">Monitor platform performance and manage operations</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
                <span className="text-sm">System Online</span>
              </div>
              <p className="text-xs text-white/80">Last updated: 2 min ago</p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{platformStats.totalUsers.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="w-4 h-4 text-accent" />
                <span className="text-sm text-accent">+12.5% this month</span>
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
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6 text-secondary" />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="w-4 h-4 text-accent" />
                <span className="text-sm text-accent">+8% this week</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">₹{platformStats.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <IndianRupee className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="w-4 h-4 text-accent" />
                <span className="text-sm text-accent">+23% this month</span>
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
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="w-4 h-4 text-accent" />
                <span className="text-sm text-accent">+15% today</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts & Top Performers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${getSeverityColor(alert.severity)}`}>
                        {getAlertIcon(alert.type)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">{alert.time}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Resolve
                    </Button>
                  </div>
                ))}
                
                <Button className="w-full mt-4" variant="outline">
                  View All Alerts
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Top Performers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformers.map((performer, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                        #{index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{performer.name}</p>
                        <p className="text-sm text-muted-foreground">{performer.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">{performer.metric}</p>
                      <p className="text-xs text-muted-foreground">
                        {performer.earnings || performer.services}
                      </p>
                    </div>
                  </div>
                ))}
                
                <Button className="w-full mt-4" variant="outline">
                  View All Performance
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-medium transition-shadow cursor-pointer group" onClick={() => window.location.href = '/dashboard/admin/users'}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">User Management</h3>
              <p className="text-sm text-muted-foreground">Manage users and roles</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-shadow cursor-pointer group" onClick={() => window.location.href = '/dashboard/admin/fuel'}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Fuel className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">Fuel Management</h3>
              <p className="text-sm text-muted-foreground">Control fuel prices & inventory</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-shadow cursor-pointer group" onClick={() => window.location.href = '/dashboard/admin/services'}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Settings className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Service Management</h3>
              <p className="text-sm text-muted-foreground">Manage services & mechanics</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-shadow cursor-pointer group" onClick={() => window.location.href = '/dashboard/admin/inventory'}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Package className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Inventory</h3>
              <p className="text-sm text-muted-foreground">Track parts & supplies</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-shadow cursor-pointer group" onClick={() => window.location.href = '/dashboard/admin/analytics'}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">Analytics</h3>
              <p className="text-sm text-muted-foreground">View detailed reports</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-shadow cursor-pointer group" onClick={() => window.location.href = '/dashboard/admin/payments'}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <IndianRupee className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Payments</h3>
              <p className="text-sm text-muted-foreground">Payment processing</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-shadow cursor-pointer group" onClick={() => window.location.href = '/dashboard/admin/support'}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Support</h3>
              <p className="text-sm text-muted-foreground">Customer support</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-shadow cursor-pointer group" onClick={() => window.location.href = '/dashboard/admin/settings'}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Settings className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">Settings</h3>
              <p className="text-sm text-muted-foreground">System configuration</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;