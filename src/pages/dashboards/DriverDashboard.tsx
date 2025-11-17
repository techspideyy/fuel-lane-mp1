import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  MapPin,
  Navigation,
  Truck,
  IndianRupee,
  Clock,
  CheckCircle,
  AlertTriangle,
  Fuel,
  Star,
  Route,
} from "lucide-react";

const DriverDashboard = () => {
  const activeDeliveries = [
    {
      id: "DEL-001",
      customer: "John Smith",
      address: "123 Main St, Downtown",
      fuelType: "Premium Gasoline",
      quantity: "50L",
      distance: "2.3 km",
      priority: "high",
      estimatedTime: "15 min",
    },
    {
      id: "DEL-002",
      customer: "Sarah Johnson",
      address: "456 Oak Ave, Suburbs",
      fuelType: "Diesel",
      quantity: "30L",
      distance: "5.7 km",
      priority: "medium",
      estimatedTime: "25 min",
    },
  ];

  const todayStats = {
    deliveries: 8,
    earnings: 13146.0,
    distance: 45.2,
    rating: 4.9,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  return (
    <div className="space-y-6">
      {/* Driver Status Header */}
      <div className="bg-fuel-gradient rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Driver Dashboard</h1>
            <p className="text-white/90">Manage your deliveries and track earnings</p>
          </div>
          <div className="text-right">
            <Badge className="bg-accent text-accent-foreground mb-2">
              <CheckCircle className="w-4 h-4 mr-1" />
              Online
            </Badge>
            <p className="text-sm text-white/80">Active since 8:00 AM</p>
          </div>
        </div>
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Deliveries</p>
                <p className="text-2xl font-bold">{todayStats.deliveries}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 text-primary" />
              </div>
            </div>
            <Progress value={(todayStats.deliveries / 12) * 100} className="mt-3" />
            <p className="text-xs text-muted-foreground mt-2">Goal: 12 deliveries</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Earnings</p>
                <p className="text-2xl font-bold">₹{todayStats.earnings}</p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <IndianRupee className="w-6 h-6 text-accent" />
              </div>
            </div>
            <Progress value={(todayStats.earnings / 200) * 100} className="mt-3" />
            <p className="text-xs text-muted-foreground mt-2">Goal: ₹16800</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Distance</p>
                <p className="text-2xl font-bold">{todayStats.distance} km</p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                <Route className="w-6 h-6 text-secondary" />
              </div>
            </div>
            <Progress value={(todayStats.distance / 80) * 100} className="mt-3" />
            <p className="text-xs text-muted-foreground mt-2">Efficient routing</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rating</p>
                <p className="text-2xl font-bold">{todayStats.rating}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
            <Progress value={(todayStats.rating / 5) * 100} className="mt-3" />
            <p className="text-xs text-muted-foreground mt-2">Excellent service</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Deliveries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Active Deliveries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeDeliveries.map((delivery) => (
                <div
                  key={delivery.id}
                  className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-medium">{delivery.customer}</p>
                      <p className="text-sm text-muted-foreground">{delivery.id}</p>
                    </div>
                    <Badge className={getPriorityColor(delivery.priority)}>{delivery.priority}</Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{delivery.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Fuel className="w-4 h-4 text-muted-foreground" />
                      <span>
                        {delivery.fuelType} - {delivery.quantity}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Navigation className="w-4 h-4 text-muted-foreground" />
                        <span>{delivery.distance}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{delivery.estimatedTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className="flex-1">
                      <Navigation className="w-4 h-4 mr-2" />
                      Navigate
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Contact Customer
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="w-5 h-5" />
              Vehicle Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Fuel Level */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Fuel Level</span>
                  <span className="text-sm text-muted-foreground">75%</span>
                </div>
                <Progress value={75} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">Good for ~180 km</p>
              </div>

              {/* Cargo Capacity */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Cargo Capacity</span>
                  <span className="text-sm text-muted-foreground">320L / 500L</span>
                </div>
                <Progress value={64} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">180L available</p>
              </div>

              {/* Vehicle Health */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-accent/10 rounded-lg text-center">
                  <CheckCircle className="w-6 h-6 text-accent mx-auto mb-1" />
                  <p className="text-xs font-medium">Engine</p>
                  <p className="text-xs text-muted-foreground">Good</p>
                </div>
                <div className="p-3 bg-accent/10 rounded-lg text-center">
                  <CheckCircle className="w-6 h-6 text-accent mx-auto mb-1" />
                  <p className="text-xs font-medium">Tires</p>
                  <p className="text-xs text-muted-foreground">Good</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded-lg text-center">
                  <AlertTriangle className="w-6 h-6 text-secondary mx-auto mb-1" />
                  <p className="text-xs font-medium">Brakes</p>
                  <p className="text-xs text-muted-foreground">Check Soon</p>
                </div>
                <div className="p-3 bg-accent/10 rounded-lg text-center">
                  <CheckCircle className="w-6 h-6 text-accent mx-auto mb-1" />
                  <p className="text-xs font-medium">Fuel Pump</p>
                  <p className="text-xs text-muted-foreground">Good</p>
                </div>
              </div>

              <Button className="w-full" variant="outline">
                <Truck className="w-4 h-4 mr-2" />
                Schedule Maintenance
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-medium transition-shadow cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold mb-2">View Route</h3>
            <p className="text-sm text-muted-foreground mb-4">Optimize your delivery route</p>
            <Button className="w-full">Open Map</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-shadow cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <IndianRupee className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Earnings Report</h3>
            <p className="text-sm text-muted-foreground mb-4">View detailed earnings</p>
            <Button variant="outline" className="w-full">
              View Report
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-shadow cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Schedule</h3>
            <p className="text-sm text-muted-foreground mb-4">Manage your work schedule</p>
            <Button variant="secondary" className="w-full">
              View Schedule
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DriverDashboard;
