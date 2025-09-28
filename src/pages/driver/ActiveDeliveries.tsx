import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  MapPin, 
  Navigation, 
  Truck, 
  Clock, 
  Phone,
  CheckCircle,
  AlertTriangle,
  Fuel,
  Search,
  Filter,
  Star,
  Route
} from "lucide-react";

const ActiveDeliveries = () => {
  const deliveries = [
    {
      id: "DEL-001",
      customer: "John Smith",
      phone: "+91 9876543210",
      address: "123 Main St, Sector 15, Noida",
      fuelType: "Premium Gasoline",
      quantity: "50L",
      distance: "2.3 km",
      priority: "high",
      estimatedTime: "15 min",
      status: "in_progress",
      customerRating: 4.8,
      orderValue: "₹5,437.50",
      instructions: "Call before arriving"
    },
    {
      id: "DEL-002", 
      customer: "Sarah Johnson",
      phone: "+91 9123456789",
      address: "456 Oak Ave, Green Park, Delhi",
      fuelType: "Diesel",
      quantity: "30L", 
      distance: "5.7 km",
      priority: "medium",
      estimatedTime: "25 min",
      status: "pending",
      customerRating: 4.9,
      orderValue: "₹2,679.00",
      instructions: "Basement parking available"
    },
    {
      id: "DEL-003",
      customer: "Mike Wilson", 
      phone: "+91 9988776655",
      address: "789 Pine Road, Cyber City, Gurgaon",
      fuelType: "CNG",
      quantity: "25L",
      distance: "8.1 km", 
      priority: "low",
      estimatedTime: "35 min",
      status: "assigned",
      customerRating: 4.6,
      orderValue: "₹1,880.00",
      instructions: "Security gate entry required"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-secondary text-secondary-foreground";
      case "low": return "bg-accent text-accent-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_progress": return "bg-primary text-primary-foreground";
      case "pending": return "bg-secondary text-secondary-foreground";
      case "assigned": return "bg-accent text-accent-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "in_progress": return "In Progress";
      case "pending": return "Pending";
      case "assigned": return "Assigned";
      default: return status;
    }
  };

  return (
    <DashboardLayout userRole="driver">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-fuel-gradient rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Active Deliveries</h1>
              <p className="text-white/90">Manage and track your current fuel deliveries</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{deliveries.length}</div>
              <p className="text-sm text-white/80">Active Orders</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search by customer name or delivery ID..." className="pl-10" />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Route className="w-4 h-4" />
            Optimize Route
          </Button>
        </div>

        {/* Delivery Cards */}
        <div className="grid gap-6">
          {deliveries.map((delivery) => (
            <Card key={delivery.id} className="overflow-hidden hover:shadow-medium transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <Truck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{delivery.customer}</CardTitle>
                      <p className="text-sm text-muted-foreground">{delivery.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(delivery.priority)}>
                      {delivery.priority} priority
                    </Badge>
                    <Badge className={getStatusColor(delivery.status)}>
                      {getStatusLabel(delivery.status)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Customer Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{delivery.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{delivery.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">{delivery.customerRating} rating</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Fuel className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{delivery.fuelType} - {delivery.quantity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Navigation className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{delivery.distance}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">ETA: {delivery.estimatedTime}</span>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Order Value</span>
                    <span className="font-bold text-lg">{delivery.orderValue}</span>
                  </div>
                  {delivery.instructions && (
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-secondary mt-0.5" />
                      <p className="text-sm text-muted-foreground">{delivery.instructions}</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button className="flex-1 sm:flex-none">
                    <Navigation className="w-4 h-4 mr-2" />
                    Navigate
                  </Button>
                  <Button variant="outline" className="flex-1 sm:flex-none">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Customer
                  </Button>
                  {delivery.status === "assigned" && (
                    <Button variant="secondary" className="flex-1 sm:flex-none">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Start Delivery
                    </Button>
                  )}
                  {delivery.status === "in_progress" && (
                    <Button variant="secondary" className="flex-1 sm:flex-none">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark Delivered
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {deliveries.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Truck className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Active Deliveries</h3>
              <p className="text-muted-foreground">You're all caught up! New deliveries will appear here.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ActiveDeliveries;