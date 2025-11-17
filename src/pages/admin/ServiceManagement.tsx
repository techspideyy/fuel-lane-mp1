import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Plus,
  Filter,
  Edit3,
  Eye,
  Trash2,
  Star,
  User,
} from "lucide-react";

// ======================================================
// Types
// ======================================================

interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: string;
  status: "active" | "inactive";
  popularity: number;
  rating: number;
  bookings: number;
}

interface Mechanic {
  id: string;
  name: string;
  specialties: string[];
  rating: number;
  completedServices: number;
  status: "active" | "busy";
  location: string;
}

// ======================================================
// Utilities
// ======================================================

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    active: "bg-accent text-accent-foreground",
    inactive: "bg-muted text-muted-foreground",
    busy: "bg-secondary text-secondary-foreground",
  };
  return colors[status] || "bg-muted text-muted-foreground";
};

// ======================================================
// Subcomponents
// ======================================================

const ServiceCard = ({ service }: { service: Service }) => {
  return (
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
          <InfoItem label="Price" value={`₹${service.price}`} />
          <InfoItem label="Duration" value={service.duration} />
          <InfoItem
            label="Rating"
            value={
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500" />
                {service.rating}
              </span>
            }
          />
          <InfoItem label="Bookings" value={service.bookings} />
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
};

const MechanicCard = ({ mechanic }: { mechanic: Mechanic }) => {
  return (
    <Card className="hover:shadow-medium transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{mechanic.name}</h3>
              <p className="text-sm text-muted-foreground">
                {mechanic.location}
              </p>
            </div>
          </div>
          <Badge className={getStatusColor(mechanic.status)}>
            {mechanic.status}
          </Badge>
        </div>

        <div className="mb-3">
          <p className="text-sm text-muted-foreground mb-1">Specialties</p>
          <div className="flex gap-1 flex-wrap">
            {mechanic.specialties.map((spec) => (
              <Badge variant="secondary" key={spec} className="text-xs">
                {spec}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
          <InfoItem
            label="Rating"
            value={
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500" />
                {mechanic.rating}
              </span>
            }
          />
          <InfoItem
            label="Services"
            value={mechanic.completedServices.toString()}
          />
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
};

const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value: string | React.ReactNode;
}) => (
  <div>
    <p className="text-muted-foreground">{label}</p>
    <p className="font-bold">{value}</p>
  </div>
);

// ======================================================
// Main Component (NO DashboardLayout wrapper)
// ======================================================

const ServiceManagement = () => {
  const services: Service[] = [
    {
      id: "SRV-001",
      name: "Oil Change",
      category: "Maintenance",
      price: 3327.17,
      duration: "30 min",
      status: "active",
      popularity: 95,
      rating: 4.8,
      bookings: 245,
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
      bookings: 156,
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
      bookings: 123,
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
      bookings: 89,
    },
  ];

  const mechanics: Mechanic[] = [
    {
      id: "MEC-001",
      name: "Mike Wilson",
      specialties: ["Engine", "Brakes"],
      rating: 4.9,
      completedServices: 342,
      status: "active",
      location: "Downtown",
    },
    {
      id: "MEC-002",
      name: "Lisa Rodriguez",
      specialties: ["Maintenance", "Diagnostics"],
      rating: 4.8,
      completedServices: 298,
      status: "active",
      location: "Airport",
    },
    {
      id: "MEC-003",
      name: "David Kim",
      specialties: ["Tires", "Oil"],
      rating: 4.7,
      completedServices: 234,
      status: "busy",
      location: "Suburban",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Header />

      {/* Stats */}
      <Stats services={services} mechanics={mechanics} />

      {/* Search & Filters */}
      <SearchBar />

      {/* Tabs */}
      <Tabs defaultValue="services" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="services">
            Services ({services.length})
          </TabsTrigger>
          <TabsTrigger value="mechanics">
            Mechanics ({mechanics.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4">
          <Grid>
            {services.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </Grid>
        </TabsContent>

        <TabsContent value="mechanics" className="space-y-4">
          <Grid>
            {mechanics.map((m) => (
              <MechanicCard key={m.id} mechanic={m} />
            ))}
          </Grid>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// ======================================================
// Layout Helpers
// ======================================================

const Header = () => (
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
);

const Stats = ({ services, mechanics }: any) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
    <StatCard title="Total Services" value={services.length} />
    <StatCard title="Mechanics" value={mechanics.length} />
    <StatCard title="Total Bookings" value="613" />
    <StatCard title="Avg Rating" value="4.8" highlight />
  </div>
);

const StatCard = ({
  title,
  value,
  highlight,
}: {
  title: string;
  value: any;
  highlight?: boolean;
}) => (
  <Card>
    <CardContent className="p-4">
      <div className="text-center">
        <p className={`text-2xl font-bold ${highlight ? "text-accent" : ""}`}>
          {value}
        </p>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </CardContent>
  </Card>
);

const SearchBar = () => (
  <div className="flex gap-4">
    <div className="flex-1 relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input placeholder="Search services..." className="pl-10" />
    </div>
    <Button variant="outline">
      <Filter className="w-4 h-4 mr-2" />
      Filter
    </Button>
  </div>
);

const Grid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    {children}
  </div>
);

export default ServiceManagement;
