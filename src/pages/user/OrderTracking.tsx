import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MapPin, 
  Clock, 
  Phone, 
  MessageCircle, 
  Truck,
  CheckCircle,
  Navigation,
  Fuel,
  Star,
  User
} from "lucide-react";

const OrderTracking = () => {
  const [activeOrder] = useState({
    id: "FO-2024-001",
    type: "fuel",
    service: "Premium Petrol",
    quantity: "50L",
    amount: "₹6,437.50",
    status: "in-transit",
    estimatedTime: "12 minutes",
    driver: {
      name: "Rajesh Kumar",
      phone: "+91 98765 43210",
      rating: 4.8,
      vehicle: "Fuel Truck - MH 12 AB 3456",
      image: "/api/placeholder/40/40"
    },
    timeline: [
      { status: "confirmed", time: "10:30 AM", completed: true, description: "Order confirmed" },
      { status: "preparing", time: "10:35 AM", completed: true, description: "Fuel loading started" },
      { status: "dispatched", time: "10:45 AM", completed: true, description: "Driver dispatched" },
      { status: "in-transit", time: "11:00 AM", completed: false, description: "On the way to delivery location" },
      { status: "delivered", time: "11:20 AM", completed: false, description: "Fuel delivered successfully" }
    ],
    location: {
      pickup: "FuelPro Station, Bandra West",
      delivery: "123 Marine Drive, Mumbai"
    }
  });

  const recentOrders = [
    {
      id: "FO-2024-002",
      type: "fuel",
      service: "Diesel",
      quantity: "30L",
      status: "delivered",
      date: "Yesterday",
      amount: "₹3,558.40"
    },
    {
      id: "GS-2024-003",
      type: "garage", 
      service: "Oil Change",
      status: "completed",
      date: "2 days ago",
      amount: "₹1,416.00"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-primary text-primary-foreground";
      case "preparing": return "bg-secondary text-secondary-foreground";
      case "dispatched": return "bg-secondary text-secondary-foreground";
      case "in-transit": return "bg-primary text-primary-foreground";
      case "delivered": return "bg-accent text-accent-foreground";
      case "completed": return "bg-accent text-accent-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getOrderProgress = (status: string) => {
    switch (status) {
      case "confirmed": return 20;
      case "preparing": return 40;
      case "dispatched": return 60;
      case "in-transit": return 80;
      case "delivered": return 100;
      default: return 0;
    }
  };

  return (
    <DashboardLayout userRole="user">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-fuel-gradient rounded-lg p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Track Your Orders</h1>
          <p className="text-white/90">Real-time tracking for all your fuel deliveries and services</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Order Tracking */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live Tracking */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Live Tracking
                  </CardTitle>
                  <Badge className={getStatusColor(activeOrder.status)}>
                    {activeOrder.status.replace('-', ' ').toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Map Placeholder */}
                <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Interactive Map View</p>
                    <p className="text-sm text-muted-foreground">Track driver location in real-time</p>
                  </div>
                </div>

                {/* Order Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Delivery Progress</span>
                    <span className="text-sm text-muted-foreground">
                      ETA: {activeOrder.estimatedTime}
                    </span>
                  </div>
                  <Progress value={getOrderProgress(activeOrder.status)} className="h-3" />
                </div>

                {/* Location Details */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-secondary rounded-full mt-2" />
                    <div>
                      <p className="font-medium">Pickup Location</p>
                      <p className="text-sm text-muted-foreground">{activeOrder.location.pickup}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-primary rounded-full mt-2" />
                    <div>
                      <p className="font-medium">Delivery Location</p>
                      <p className="text-sm text-muted-foreground">{activeOrder.location.delivery}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Order Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeOrder.timeline.map((step, index) => (
                    <div key={step.status} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.completed ? 'bg-accent text-accent-foreground' : 
                          step.status === activeOrder.status ? 'bg-primary text-primary-foreground' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {step.completed ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <Clock className="w-4 h-4" />
                          )}
                        </div>
                        {index < activeOrder.timeline.length - 1 && (
                          <div className={`w-0.5 h-8 mt-2 ${
                            step.completed ? 'bg-accent' : 'bg-muted'
                          }`} />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium capitalize">
                            {step.status.replace('-', ' ')}
                          </p>
                          <span className="text-sm text-muted-foreground">{step.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Details & Driver Info */}
          <div className="space-y-6">
            {/* Order Details */}
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white">
                      ⛽
                    </div>
                    <div>
                      <p className="font-medium">{activeOrder.service}</p>
                      <p className="text-sm text-muted-foreground">Order #{activeOrder.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Quantity: {activeOrder.quantity}</span>
                    <span className="font-medium">{activeOrder.amount}</span>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>Estimated delivery: {activeOrder.estimatedTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>Quality guaranteed</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Driver Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Driver Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={activeOrder.driver.image} alt={activeOrder.driver.name} />
                    <AvatarFallback>
                      <User className="w-6 h-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{activeOrder.driver.name}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm">{activeOrder.driver.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>{activeOrder.driver.vehicle}</p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="p-3 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {order.type === "fuel" ? (
                            <Fuel className="w-4 h-4 text-primary" />
                          ) : (
                            <Navigation className="w-4 h-4 text-accent" />
                          )}
                          <span className="font-medium text-sm">{order.service}</span>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{order.date}</span>
                        <span className="font-medium">{order.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OrderTracking;