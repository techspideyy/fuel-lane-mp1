import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  User, 
  CheckCircle, 
  AlertTriangle,
  Search,
  Phone,
  MapPin,
  Wrench,
  Plus,
  Filter,
  Edit3,
  Trash2
} from "lucide-react";

const AppointmentManagement = () => {
  const appointments = {
    today: [
      {
        id: "APT-001",
        customer: "John Smith",
        vehicle: "Honda Civic 2020",
        service: "Oil Change + Filter",
        time: "9:00 AM",
        duration: "45 min",
        status: "in-progress",
        priority: "medium",
        phone: "+1 234-567-8900",
        location: "Bay 1"
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
        phone: "+1 234-567-8901",
        location: "Bay 2"
      }
    ],
    upcoming: [
      {
        id: "APT-004",
        customer: "Emily Davis",
        vehicle: "Nissan Altima 2022",
        service: "Transmission Service",
        time: "Tomorrow 10:00 AM",
        duration: "90 min",
        status: "scheduled",
        priority: "high",
        phone: "+1 234-567-8903",
        location: "Bay 1"
      },
      {
        id: "APT-005",
        customer: "Robert Brown",
        vehicle: "Chevrolet Malibu 2018",
        service: "AC Repair",
        time: "Dec 21, 2:00 PM",
        duration: "120 min",
        status: "scheduled",
        priority: "medium",
        phone: "+1 234-567-8904",
        location: "Bay 3"
      }
    ],
    completed: [
      {
        id: "APT-003",
        customer: "Mike Wilson",
        vehicle: "Ford F-150 2021",
        service: "Tire Rotation",
        time: "Yesterday 2:00 PM",
        duration: "30 min",
        status: "completed",
        priority: "low",
        phone: "+1 234-567-8902",
        location: "Bay 2"
      }
    ]
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

  const AppointmentCard = ({ appointment }: { appointment: any }) => (
    <Card className="hover:shadow-medium transition-shadow">
      <CardContent className="p-4">
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
        
        <div className="space-y-2 text-sm mb-4">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-muted-foreground" />
            <span>{appointment.service}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>{appointment.time} ({appointment.duration})</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span>{appointment.location}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1">
            <Edit3 className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button size="sm" variant="ghost">
            <Phone className="w-4 h-4 mr-1" />
            Call
          </Button>
          {appointment.status === "scheduled" && (
            <Button size="sm" className="flex-1">
              Start Service
            </Button>
          )}
          {appointment.status === "in-progress" && (
            <Button size="sm" variant="secondary" className="flex-1">
              Complete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout userRole="mechanic">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Appointment Management</h1>
            <p className="text-muted-foreground">Manage and track service appointments</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Appointment
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search appointments..." className="pl-10" />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Appointments Tabs */}
        <Tabs defaultValue="today" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">Today ({appointments.today.length})</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming ({appointments.upcoming.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({appointments.completed.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-4">
            {appointments.today.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            {appointments.upcoming.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {appointments.completed.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </TabsContent>
        </Tabs>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today</p>
                  <p className="text-2xl font-bold">{appointments.today.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold">
                    {appointments.today.filter(apt => apt.status === "in-progress").length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">{appointments.completed.length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming</p>
                  <p className="text-2xl font-bold">{appointments.upcoming.length}</p>
                </div>
                <Clock className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AppointmentManagement;