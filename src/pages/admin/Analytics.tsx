import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users,
  IndianRupee,
  Package,
  Truck,
  Calendar,
  Download,
  RefreshCw,
  Target,
  Activity,
  Zap,
  Clock
} from "lucide-react";

const Analytics = () => {
  const overallStats = {
    totalRevenue: 23898000,
    revenueGrowth: 12.5,
    totalOrders: 2453,
    ordersGrowth: 8.3,
    activeUsers: 1247,
    usersGrowth: 15.2,
    avgOrderValue: 19118.40,
    avgGrowth: -2.1
  };

  const monthlyData = [
    { month: "Jan", revenue: 1554000, orders: 95, users: 245 },
    { month: "Feb", revenue: 1873200, orders: 112, users: 298 },
    { month: "Mar", revenue: 1659000, orders: 98, users: 267 },
    { month: "Apr", revenue: 2150400, orders: 125, users: 342 },
    { month: "May", revenue: 2427600, orders: 138, users: 385 },
    { month: "Jun", revenue: 2641800, orders: 152, users: 412 },
    { month: "Jul", revenue: 2388600, orders: 138, users: 385 },
    { month: "Aug", revenue: 2597400, orders: 152, users: 412 },
    { month: "Sep", revenue: 2750000, orders: 160, users: 430 },
    { month: "Oct", revenue: 2896000, orders: 168, users: 450 },
    { month: "Nov", revenue: 2640000, orders: 154, users: 420 },
    { month: "Dec", revenue: 2930000, orders: 170, users: 460 }
  ];

  const serviceCategories = [
    { name: "Fuel Delivery", revenue: 10500000, orders: 450, percentage: 44 },
    { name: "Maintenance", revenue: 7140000, orders: 320, percentage: 30 },
    { name: "Emergency Services", revenue: 3780000, orders: 180, percentage: 16 },
    { name: "Car Wash", revenue: 2394000, orders: 300, percentage: 10 }
  ];

  const topPerformers = {
    drivers: [
      { name: "Sarah Johnson", deliveries: 342, rating: 4.8, revenue: 1295280 },
      { name: "Mike Davis", deliveries: 298, rating: 4.7, revenue: 1199520 },
      { name: "Alex Chen", deliveries: 276, rating: 4.9, revenue: 1171800 }
    ],
    mechanics: [
      { name: "Mike Wilson", services: 87, rating: 4.9, revenue: 1554000 },
      { name: "Lisa Rodriguez", services: 79, rating: 4.8, revenue: 1444800 },
      { name: "David Kim", services: 65, rating: 4.7, revenue: 1411200 }
    ]
  };

  const recentActivity = [
    { time: "2 min ago", event: "New order placed", user: "John Doe", amount: "₹10542.00" },
    { time: "15 min ago", event: "Service completed", user: "Jane Smith", amount: "₹7559.16" },
    { time: "1 hour ago", event: "Payment processed", user: "Bob Johnson", amount: "₹19719.00" },
    { time: "2 hours ago", event: "User registered", user: "Alice Brown", amount: "-" },
    { time: "3 hours ago", event: "Order cancelled", user: "Charlie Wilson", amount: "-₹5649.00" },
    { time: "4 hours ago", event: "Fuel delivery", user: "Diana Lee", amount: "₹13171.20" }
  ];

  const StatCard = ({ title, value, growth, icon: Icon, format = "" }: any) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">
              {format === "currency" ? "₹" : ""}{typeof value === "number" ? value.toLocaleString() : value}{format === "percentage" ? "%" : ""}
            </p>
            <div className="flex items-center gap-1 mt-2">
              {growth > 0 ? (
                <TrendingUp className="w-4 h-4 text-accent" />
              ) : (
                <TrendingDown className="w-4 h-4 text-destructive" />
              )}
              <span className={`text-sm ${growth > 0 ? "text-accent" : "text-destructive"}`}>
                {Math.abs(growth)}%
              </span>
              <span className="text-sm text-muted-foreground">vs last month</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Comprehensive business insights and performance metrics</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Revenue"
            value={overallStats.totalRevenue}
            growth={overallStats.revenueGrowth}
            icon={IndianRupee}
            format="currency"
          />
          <StatCard
            title="Total Orders"
            value={overallStats.totalOrders}
            growth={overallStats.ordersGrowth}
            icon={Package}
          />
          <StatCard
            title="Active Users"
            value={overallStats.activeUsers}
            growth={overallStats.usersGrowth}
            icon={Users}
          />
          <StatCard
            title="Avg Order Value"
            value={overallStats.avgOrderValue}
            growth={overallStats.avgGrowth}
            icon={Target}
            format="currency"
          />
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Monthly Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyData.slice(-6).map((data, index) => (
                      <div key={data.month} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{data.month}</p>
                            <p className="text-sm text-muted-foreground">{data.orders} orders</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">₹{data.revenue.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">{data.users} users</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <div>
                            <p className="font-medium text-sm">{activity.event}</p>
                            <p className="text-xs text-muted-foreground">{activity.user} • {activity.time}</p>
                          </div>
                        </div>
                        {activity.amount !== "-" && (
                          <Badge variant="outline">{activity.amount}</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Service Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {serviceCategories.map((category, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{category.name}</span>
                          <span>₹{category.revenue.toLocaleString()}</span>
                        </div>
                        <Progress value={category.percentage} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{category.orders} orders</span>
                          <span>{category.percentage}% of total</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Growth Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Growth Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <TrendingUp className="w-8 h-8 text-accent" />
                      </div>
                      <p className="text-2xl font-bold text-accent">+{overallStats.revenueGrowth}%</p>
                      <p className="text-sm text-muted-foreground">Revenue Growth</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Users className="w-8 h-8 text-secondary" />
                      </div>
                      <p className="text-2xl font-bold text-secondary">+{overallStats.usersGrowth}%</p>
                      <p className="text-sm text-muted-foreground">User Growth</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {serviceCategories.map((service, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Package className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{service.name}</h3>
                      <p className="text-2xl font-bold mb-1">₹{service.revenue.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground mb-3">{service.orders} orders</p>
                      <Progress value={service.percentage} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-2">{service.percentage}% of total revenue</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Drivers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Top Performing Drivers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPerformers.drivers.map((driver, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold">{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium">{driver.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {driver.deliveries} deliveries • ⭐ {driver.rating}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">₹{driver.revenue.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">revenue</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Mechanics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Top Performing Mechanics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPerformers.mechanics.map((mechanic, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold">{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium">{mechanic.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {mechanic.services} services • ⭐ {mechanic.rating}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">₹{mechanic.revenue.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">revenue</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;