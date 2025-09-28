import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Wrench, 
  Search, 
  Plus, 
  Filter,
  Clock,
  IndianRupee,
  Edit3,
  Trash2,
  Package,
  Settings,
  Car,
  Zap
} from "lucide-react";

const ServiceManagement = () => {
  const servicePackages = [
    {
      id: "SVC-001",
      name: "Basic Oil Change",
      category: "Maintenance",
      duration: "30 min",
      price: 45.99,
      description: "Standard oil change with filter replacement",
      parts: ["Engine Oil (5W-30)", "Oil Filter"],
      labor: 25.00,
      markup: 20.99,
      popularity: "high",
      status: "active"
    },
    {
      id: "SVC-002", 
      name: "Brake Inspection & Service",
      category: "Brakes",
      duration: "90 min",
      price: 189.99,
      description: "Complete brake system inspection and pad replacement",
      parts: ["Brake Pads", "Brake Fluid"],
      labor: 120.00,
      markup: 69.99,
      popularity: "medium",
      status: "active"
    },
    {
      id: "SVC-003",
      name: "Tire Rotation & Balance",
      category: "Tires",
      duration: "45 min", 
      price: 79.99,
      description: "Tire rotation and wheel balancing service",
      parts: ["Wheel Weights"],
      labor: 50.00,
      markup: 29.99,
      popularity: "high",
      status: "active"
    },
    {
      id: "SVC-004",
      name: "AC System Service",
      category: "Climate",
      duration: "120 min",
      price: 249.99,
      description: "Complete AC system check and refrigerant refill",
      parts: ["AC Refrigerant", "AC Filter"],
      labor: 150.00,
      markup: 99.99,
      popularity: "low",
      status: "active"
    },
    {
      id: "SVC-005",
      name: "Transmission Service",
      category: "Drivetrain",
      duration: "180 min",
      price: 349.99,
      description: "Transmission fluid change and filter replacement",
      parts: ["Transmission Fluid", "Transmission Filter"],
      labor: 200.00,
      markup: 149.99,
      popularity: "medium",
      status: "active"
    },
    {
      id: "SVC-006",
      name: "Engine Diagnostic",
      category: "Diagnostics",
      duration: "60 min",
      price: 129.99,
      description: "Comprehensive engine diagnostic scan",
      parts: [],
      labor: 100.00,
      markup: 29.99,
      popularity: "high",
      status: "active"
    }
  ];

  const categories = [
    { name: "Maintenance", count: 2, icon: Wrench },
    { name: "Brakes", count: 1, icon: Car },
    { name: "Tires", count: 1, icon: Settings },
    { name: "Climate", count: 1, icon: Zap },
    { name: "Drivetrain", count: 1, icon: Package },
    { name: "Diagnostics", count: 1, icon: Search }
  ];

  const getPopularityColor = (popularity: string) => {
    switch (popularity) {
      case "high": return "bg-accent text-accent-foreground";
      case "medium": return "bg-secondary text-secondary-foreground";
      case "low": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const ServiceCard = ({ service }: { service: any }) => (
    <Card className="hover:shadow-medium transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-medium text-lg mb-1">{service.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
            <div className="flex gap-2 mb-3">
              <Badge variant="outline">{service.category}</Badge>
              <Badge className={getPopularityColor(service.popularity)}>
                {service.popularity} demand
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">${service.price}</p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{service.duration}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Labor:</span>
            <span>${service.labor}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Parts & Markup:</span>
            <span>${service.markup}</span>
          </div>
          {service.parts.length > 0 && (
            <div className="text-sm">
              <span className="text-muted-foreground">Required Parts:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {service.parts.map((part: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {part}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1">
            <Edit3 className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button size="sm" variant="ghost">
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button size="sm" className="flex-1">
            Use Service
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const totalServices = servicePackages.length;
  const avgPrice = servicePackages.reduce((sum, s) => sum + s.price, 0) / totalServices;
  const highDemandServices = servicePackages.filter(s => s.popularity === "high").length;

  return (
    <DashboardLayout userRole="mechanic">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Service Management</h1>
            <p className="text-muted-foreground">Manage service packages and pricing</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Service
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Services</p>
                  <p className="text-2xl font-bold">{totalServices}</p>
                </div>
                <Wrench className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Price</p>
                  <p className="text-2xl font-bold">${avgPrice.toFixed(0)}</p>
                </div>
                <IndianRupee className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">High Demand</p>
                  <p className="text-2xl font-bold text-accent">{highDemandServices}</p>
                </div>
                <Package className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Categories</p>
                  <p className="text-2xl font-bold">{categories.length}</p>
                </div>
                <Settings className="w-8 h-8 text-muted-foreground" />
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

        {/* Service Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Services ({totalServices})</TabsTrigger>
            <TabsTrigger value="popular">Popular ({highDemandServices})</TabsTrigger>
            <TabsTrigger value="categories">Categories ({categories.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {servicePackages.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="popular" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {servicePackages.filter(s => s.popularity === "high").map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Card key={category.name} className="hover:shadow-medium transition-shadow cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{category.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {category.count} service{category.count !== 1 ? 's' : ''}
                      </p>
                      <Button variant="outline" className="w-full">
                        View Services
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ServiceManagement;