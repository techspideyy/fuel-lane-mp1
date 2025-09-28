import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Wrench, Search, Plus, Filter, Edit3, Eye, Trash2, 
  Clock, CheckCircle, Star, IndianRupee, User
} from "lucide-react";

const ServiceManagement = () => {
  const services = [
    {
      id: "SRV-001",
      name: "Oil Change",
      category: "Maintenance",
      price: 3327.17,
      duration: "30 min",
      status: "active",
      popularity: 95,
      rating: 4.8,
      bookings: 245
    },
    {
      id: "SRV-002", 
      name: "Brake Inspection",
      category: "Safety",
      price: 7486.17,
      duration: "45 min",
      status: "active",
      popularity: 78,
      rating: 4.9,
      bookings: 156
    },
    {
      id: "SRV-003",
      name: "Tire Replacement",
      category: "Maintenance",
      price: 16639.17,
      duration: "60 min",
      status: "active",
      popularity: 68,
      rating: 4.7,
      bookings: 123
    },
    {
      id: "SRV-004",
      name: "Engine Diagnostics",
      category: "Diagnostics",
      price: 10811.17,
      duration: "90 min",
      status: "inactive",
      popularity: 45,
      rating: 4.6,
      bookings: 89
    }
  ];

  const mechanics = [
    {
      id: "MEC-001",
      name: "Mike Wilson",
      specialties: ["Engine", "Brakes"],
      rating: 4.9,
      completedServices: 342,
      status: "active",
      location: "Downtown"
    },
    {
      id: "MEC-002",
      name: "Lisa Rodriguez", 
      specialties: ["Maintenance", "Diagnostics"],
      rating: 4.8,
      completedServices: 298,
      status: "active",
      location: "Airport"
    },
    {
      id: "MEC-003",
      name: "David Kim",
      specialties: ["Tires", "Oil"],
      rating: 4.7,
      completedServices: 234,
      status: "busy",
      location: "Suburban"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-accent text-accent-foreground";
      case "inactive": return "bg-muted text-muted-foreground";
      case "busy": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const ServiceCard = ({ service }: { service: any }) => (
    <Card className="hover:shadow-medium transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold">{service.name}</h3>
            <Badge variant="outline" className="mt-1">
              {service.category}
            </Badge>
          </div>
          <Badge className={getStatusColor(service.status)}>
            {service.status}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
          <div>
            <p className="text-muted-foreground">Price</p>
            <p className="font-bold">₹{service.price}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Duration</p>
            <p className="font-bold">{service.duration}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Rating</p>
            <p className="font-bold flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500" />
              {service.rating}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Bookings</p>
            <p className="font-bold">{service.bookings}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1">
            <Eye className="w-3 h-3 mr-1" />
            View
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <Edit3 className="w-3 h-3 mr-1" />
            Edit
          </Button>
          <Button size="sm" variant="destructive">
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const MechanicCard = ({ mechanic }: { mechanic: any }) => (
    <Card className="hover:shadow-medium transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{mechanic.name}</h3>
              <p className="text-sm text-muted-foreground">{mechanic.location}</p>
            </div>
          </div>
          <Badge className={getStatusColor(mechanic.status)}>
            {mechanic.status}
          </Badge>
        </div>

        <div className="mb-3">
          <p className="text-sm text-muted-foreground mb-1">Specialties</p>
          <div className="flex gap-1">
            {mechanic.specialties.map((specialty: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
          <div>
            <p className="text-muted-foreground">Rating</p>
            <p className="font-bold flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500" />
              {mechanic.rating}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Services</p>
            <p className="font-bold">{mechanic.completedServices}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1">
            <Eye className="w-3 h-3 mr-1" />
            View
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <Edit3 className="w-3 h-3 mr-1" />
            Edit
          </Button>
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
            <h1 className="text-3xl font-bold">Service Management</h1>
            <p className="text-muted-foreground">Manage services and mechanics</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{services.length}</p>
                <p className="text-sm text-muted-foreground">Total Services</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{mechanics.length}</p>
                <p className="text-sm text-muted-foreground">Mechanics</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold">613</p>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">4.8</p>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search services..." className="pl-10" />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="services" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="services">Services ({services.length})</TabsTrigger>
            <TabsTrigger value="mechanics">Mechanics ({mechanics.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mechanics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {mechanics.map((mechanic) => (
                <MechanicCard key={mechanic.id} mechanic={mechanic} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ServiceManagement;