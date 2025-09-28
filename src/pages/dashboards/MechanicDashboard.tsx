import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Wrench, 
  Calendar, 
  Clock, 
  User, 
  CheckCircle, 
  AlertTriangle,
  Package,
  Star,
  Phone,
  MapPin,
  IndianRupee
} from "lucide-react";

const MechanicDashboard = () => {
  const todayAppointments = [
    {
      id: "APT-001",
      customer: "John Smith",
      vehicle: "Honda Civic 2020",
      service: "Oil Change + Filter",
      time: "9:00 AM",
      duration: "45 min",
      status: "in-progress",
      priority: "medium",
      phone: "+1 234-567-8900"
    },
    {
      id: "APT-002",
      customer: "Sarah Johnson", 
      vehicle: "Toyota Camry 2019",
      service: "Brake Inspection",
      time: "11:00 AM",
      duration: "60 min", 
      status: "scheduled",
      priority: "high",
      phone: "+1 234-567-8901"
    },
    {
      id: "APT-003",
      customer: "Mike Wilson",
      vehicle: "Ford F-150 2021",
      service: "Tire Rotation",
      time: "2:00 PM",
      duration: "30 min",
      status: "scheduled", 
      priority: "low",
      phone: "+1 234-567-8902"
    }
  ];

  const inventoryAlerts = [
    { item: "Engine Oil (5W-30)", stock: 5, threshold: 10, status: "low" },
    { item: "Brake Pads", stock: 2, threshold: 5, status: "critical" },
    { item: "Air Filters", stock: 15, threshold: 8, status: "good" },
    { item: "Spark Plugs", stock: 8, threshold: 12, status: "low" }
  ];

  const todayStats = {
    appointments: 6,
    completed: 3,
    revenue: 40782.00,
    rating: 4.8
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-accent text-accent-foreground";
      case "in-progress": return "bg-secondary text-secondary-foreground";
      case "scheduled": return "bg-primary text-primary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-secondary text-secondary-foreground";  
      case "low": return "bg-accent text-accent-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getInventoryStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "text-destructive";
      case "low": return "text-secondary";
      case "good": return "text-accent";
      default: return "text-muted-foreground";
    }
  };

  return (
    <DashboardLayout userRole="mechanic">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-fuel-gradient rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Mechanic Dashboard</h1>
              <p className="text-white/90">Manage appointments and track service progress</p>
            </div>
            <div className="text-right">
              <Badge className="bg-accent text-accent-foreground mb-2">
                <CheckCircle className="w-4 h-4 mr-1" />
                Available
              </Badge>
              <p className="text-sm text-white/80">Next: 11:00 AM</p>
            </div>
          </div>
        </div>

        {/* Today's Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Appointments</p>
                  <p className="text-2xl font-bold">{todayStats.appointments}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
              </div>
              <Progress value={(todayStats.appointments / 8) * 100} className="mt-3" />
              <p className="text-xs text-muted-foreground mt-2">Scheduled today</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">{todayStats.completed}</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-accent" />
                </div>
              </div>
              <Progress value={(todayStats.completed / todayStats.appointments) * 100} className="mt-3" />
              <p className="text-xs text-muted-foreground mt-2">Services finished</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-bold">₹{todayStats.revenue}</p>
                </div>
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <IndianRupee className="w-6 h-6 text-secondary" />
                </div>
              </div>
              <Progress value={(todayStats.revenue / 800) * 100} className="mt-3" />
              <p className="text-xs text-muted-foreground mt-2">Daily target: ₹67200</p>
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
              <p className="text-xs text-muted-foreground mt-2">Customer satisfaction</p>
            </CardContent>
          </Card>
        </div>

        {/* Appointments & Inventory */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Today's Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={`/api/placeholder/40/40`} alt={appointment.customer} />
                          <AvatarFallback>
                            <User className="w-5 h-5" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{appointment.customer}</p>
                          <p className="text-sm text-muted-foreground">{appointment.vehicle}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                        <Badge className={`${getPriorityColor(appointment.priority)} ml-1`} variant="outline">
                          {appointment.priority}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-muted-foreground" />
                        <span>{appointment.service}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{appointment.time} ({appointment.duration})</span>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </Button>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="flex-1">
                        Start Service
                      </Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Inventory Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Inventory Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventoryAlerts.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        item.status === 'critical' ? 'bg-destructive' : 
                        item.status === 'low' ? 'bg-secondary' : 'bg-accent'
                      }`} />
                      <div>
                        <p className="font-medium text-sm">{item.item}</p>
                        <p className="text-xs text-muted-foreground">
                          Threshold: {item.threshold} units
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${getInventoryStatusColor(item.status)}`}>
                        {item.stock}
                      </p>
                      <p className="text-xs text-muted-foreground">in stock</p>
                    </div>
                  </div>
                ))}
                
                <Button className="w-full mt-4" variant="outline" onClick={() => window.location.href = '/dashboard/mechanic/inventory'}>
                  <Package className="w-4 h-4 mr-2" />
                  Manage Inventory
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
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Schedule Management</h3>
              <p className="text-sm text-muted-foreground mb-4">View and manage appointments</p>
              <Button className="w-full" onClick={() => window.location.href = '/dashboard/mechanic/appointments'}>View Schedule</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-shadow cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Wrench className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Service Packages</h3>
              <p className="text-sm text-muted-foreground mb-4">Manage service offerings</p>
              <Button variant="outline" className="w-full" onClick={() => window.location.href = '/dashboard/mechanic/services'}>Manage Services</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-shadow cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Parts Order</h3>
              <p className="text-sm text-muted-foreground mb-4">Order replacement parts</p>
              <Button variant="secondary" className="w-full" onClick={() => window.location.href = '/dashboard/mechanic/inventory'}>Order Parts</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MechanicDashboard;