import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Search, 
  Plus, 
  Filter,
  Phone,
  Mail,
  MapPin,
  Car,
  Calendar,
  IndianRupee,
  Star,
  Clock,
  User,
  Edit3,
  Eye
} from "lucide-react";

const CustomerManagement = () => {
  const customers = [
    {
      id: "CUST-001",
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 234-567-8900",
      address: "123 Main St, City, State",
      vehicles: [
        { make: "Honda", model: "Civic", year: 2020, license: "ABC-123" }
      ],
      totalServices: 8,
      totalSpent: 1245.50,
      lastService: "2024-12-15",
      nextService: "2025-01-15",
      rating: 4.8,
      status: "active",
      joinDate: "2023-03-15"
    },
    {
      id: "CUST-002", 
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 234-567-8901",
      address: "456 Oak Ave, City, State",
      vehicles: [
        { make: "Toyota", model: "Camry", year: 2019, license: "XYZ-789" },
        { make: "Honda", model: "CR-V", year: 2021, license: "DEF-456" }
      ],
      totalServices: 12,
      totalSpent: 2150.75,
      lastService: "2024-12-10",
      nextService: "2025-01-10",
      rating: 5.0,
      status: "active",
      joinDate: "2022-08-22"
    },
    {
      id: "CUST-003",
      name: "Mike Wilson", 
      email: "mike.wilson@email.com",
      phone: "+1 234-567-8902",
      address: "789 Pine St, City, State",
      vehicles: [
        { make: "Ford", model: "F-150", year: 2021, license: "GHI-789" }
      ],
      totalServices: 5,
      totalSpent: 850.25,
      lastService: "2024-12-01",
      nextService: "2025-02-01",
      rating: 4.5,
      status: "active",
      joinDate: "2024-01-10"
    },
    {
      id: "CUST-004",
      name: "Emily Davis",
      email: "emily.davis@email.com", 
      phone: "+1 234-567-8903",
      address: "321 Elm St, City, State",
      vehicles: [
        { make: "Nissan", model: "Altima", year: 2022, license: "JKL-012" }
      ],
      totalServices: 3,
      totalSpent: 425.00,
      lastService: "2024-11-20",
      nextService: "2025-01-20",
      rating: 4.2,
      status: "new",
      joinDate: "2024-09-05"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-accent text-accent-foreground";
      case "new": return "bg-primary text-primary-foreground";
      case "inactive": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const CustomerCard = ({ customer }: { customer: any }) => (
    <Card className="hover:shadow-medium transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={`/api/placeholder/48/48`} alt={customer.name} />
              <AvatarFallback>
                <User className="w-6 h-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-lg">{customer.name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{customer.rating}</span>
                <Badge className={getStatusColor(customer.status)}>
                  {customer.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span>{customer.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <span>{customer.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{customer.address}</span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <h4 className="font-medium text-sm">Vehicles</h4>
          {customer.vehicles.map((vehicle: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm bg-muted/50 p-2 rounded">
              <Car className="w-4 h-4 text-muted-foreground" />
              <span>{vehicle.year} {vehicle.make} {vehicle.model}</span>
              <span className="text-muted-foreground">({vehicle.license})</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
          <div>
            <p className="text-sm text-muted-foreground">Services</p>
            <p className="font-bold">{customer.totalServices}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Spent</p>
            <p className="font-bold">${customer.totalSpent}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Last Service</p>
            <p className="font-bold text-sm">{customer.lastService}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Clock className="w-4 h-4" />
          <span>Next service due: {customer.nextService}</span>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1">
            <Eye className="w-4 h-4 mr-1" />
            View Details
          </Button>
          <Button size="sm" variant="outline">
            <Phone className="w-4 h-4 mr-1" />
            Call
          </Button>
          <Button size="sm" className="flex-1">
            <Calendar className="w-4 h-4 mr-1" />
            Book Service
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const activeCustomers = customers.filter(c => c.status === "active");
  const newCustomers = customers.filter(c => c.status === "new");
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgRating = customers.reduce((sum, c) => sum + c.rating, 0) / customers.length;

  return (
    <DashboardLayout userRole="mechanic">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Customer Management</h1>
            <p className="text-muted-foreground">Manage customer relationships and service history</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Customer
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Customers</p>
                  <p className="text-2xl font-bold">{customers.length}</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold text-accent">{activeCustomers.length}</p>
                </div>
                <Users className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
                </div>
                <IndianRupee className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                  <p className="text-2xl font-bold">{avgRating.toFixed(1)}</p>
                </div>
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search customers..." className="pl-10" />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Customer Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Customers ({customers.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({activeCustomers.length})</TabsTrigger>
            <TabsTrigger value="new">New ({newCustomers.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {customers.map((customer) => (
                <CustomerCard key={customer.id} customer={customer} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activeCustomers.map((customer) => (
                <CustomerCard key={customer.id} customer={customer} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {newCustomers.map((customer) => (
                <CustomerCard key={customer.id} customer={customer} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CustomerManagement;