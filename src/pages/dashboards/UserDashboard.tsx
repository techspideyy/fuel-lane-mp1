import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Fuel, 
  Wrench, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Truck,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const recentOrders = [
    {
      id: "FO-001",
      type: "fuel",
      service: "Premium Gasoline",
      quantity: "50L",
      status: "delivered",
      date: "2024-01-15",
      amount: "₹5502.00"
    },
    {
      id: "GS-002", 
      type: "garage",
      service: "Oil Change",
      status: "scheduled",
      date: "2024-01-18",
      amount: "₹3780.00"
    },
    {
      id: "FO-003",
      type: "fuel", 
      service: "Diesel",
      quantity: "30L",
      status: "in-progress",
      date: "2024-01-16",
      amount: "₹3553.20"
    }
  ];

  const vehicles = [
    {
      id: "1",
      name: "Honda Civic",
      plate: "ABC-123",
      fuelType: "Gasoline",
      lastService: "2024-01-10"
    },
    {
      id: "2", 
      name: "Toyota Prius",
      plate: "XYZ-789",
      fuelType: "Hybrid",
      lastService: "2024-01-05"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "bg-accent text-accent-foreground";
      case "in-progress": return "bg-secondary text-secondary-foreground";
      case "scheduled": return "bg-primary text-primary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered": return <CheckCircle className="w-4 h-4" />;
      case "in-progress": return <Clock className="w-4 h-4" />;
      case "scheduled": return <Calendar className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <DashboardLayout userRole="user">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-fuel-gradient rounded-lg p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-white/90">Manage your fuel deliveries and garage services</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-medium transition-shadow cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-fuel-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Fuel className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Order Fuel</h3>
              <p className="text-sm text-muted-foreground mb-4">Get fuel delivered to your location</p>
              <Button asChild className="w-full">
                <Link to="/dashboard/user/fuel">Order Now</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-shadow cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Wrench className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Garage Service</h3>
              <p className="text-sm text-muted-foreground mb-4">Book maintenance and repairs</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/dashboard/user/garage">Book Service</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-shadow cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Track Orders</h3>
              <p className="text-sm text-muted-foreground mb-4">Monitor your active deliveries</p>
              <Button asChild variant="secondary" className="w-full">
                <Link to="/dashboard/user/tracking">Track Now</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders & Vehicle Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link to="/dashboard/user/orders">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        {order.type === "fuel" ? (
                          <Fuel className="w-5 h-5 text-primary" />
                        ) : (
                          <Wrench className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{order.service}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.id} • {order.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1 capitalize">{order.status}</span>
                      </Badge>
                      <p className="text-sm font-medium mt-1">₹{order.amount.replace('$', '')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Vehicle Management */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>My Vehicles</CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Vehicle
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vehicles.map((vehicle) => (
                  <div key={vehicle.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                          <Truck className="w-5 h-5 text-secondary" />
                        </div>
                        <div>
                          <p className="font-medium">{vehicle.name}</p>
                          <p className="text-sm text-muted-foreground">{vehicle.plate}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{vehicle.fuelType}</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Last service: {vehicle.lastService}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Fuel className="w-6 h-6 text-primary" />
                </div>
              </div>
              <Progress value={75} className="mt-3" />
              <p className="text-xs text-muted-foreground mt-2">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Services Booked</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-accent" />
                </div>
              </div>
              <Progress value={60} className="mt-3" />
              <p className="text-xs text-muted-foreground mt-2">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold">₹104748</p>
                </div>
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-secondary" />
                </div>
              </div>
              <Progress value={85} className="mt-3" />
              <p className="text-xs text-muted-foreground mt-2">+15% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                  <p className="text-2xl font-bold">4.8</p>
                </div>
                <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center">
                  <span className="text-yellow-500 text-lg">★</span>
                </div>
              </div>
              <Progress value={96} className="mt-3" />
              <p className="text-xs text-muted-foreground mt-2">Based on 24 reviews</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;