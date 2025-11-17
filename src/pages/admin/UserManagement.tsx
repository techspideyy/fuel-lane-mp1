import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, Plus, Filter, Mail, MapPin, Edit3, Eye, 
  Crown, Car, Wrench, User, CheckCircle, Ban, MoreHorizontal
} from "lucide-react";

const UserManagement = () => {
  const users = [
    {
      id: "USR-001",
      name: "John Smith",
      email: "john.smith@email.com", 
      phone: "+1 234-567-8900",
      role: "customer",
      status: "active",
      joinDate: "2023-03-15",
      totalOrders: 15,
      totalSpent: 104622.00,
      location: "New York, NY"
    },
    {
      id: "USR-002",
      name: "Sarah Johnson", 
      email: "sarah.j@email.com",
      phone: "+1 234-567-8901",
      role: "driver",
      status: "active",
      joinDate: "2022-08-22",
      totalDeliveries: 342,
      rating: 4.8,
      location: "Los Angeles, CA"
    },
    {
      id: "USR-003",
      name: "Mike Wilson",
      email: "mike.wilson@email.com",
      phone: "+1 234-567-8902", 
      role: "mechanic",
      status: "active",
      joinDate: "2024-01-10",
      totalServices: 87,
      rating: 4.9,
      location: "Chicago, IL"
    },
    {
      id: "USR-004",
      name: "Emily Davis",
      email: "emily.davis@email.com",
      phone: "+1 234-567-8903",
      role: "customer", 
      status: "suspended",
      joinDate: "2024-09-05",
      totalOrders: 3,
      totalSpent: 35700.00,
      location: "Houston, TX"
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-primary text-primary-foreground";
      case "mechanic": return "bg-secondary text-secondary-foreground";
      case "driver": return "bg-accent text-accent-foreground";
      case "customer": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => { 
    switch (status) {
      case "active": return "bg-accent text-accent-foreground";
      case "suspended": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin": return Crown;
      case "mechanic": return Wrench;
      case "driver": return Car;
      case "customer": return User;
      default: return User;
    }
  };

  const UserCard = ({ user }: { user: any }) => {
    const RoleIcon = getRoleIcon(user.role);
    
    return (
      <Card className="hover:shadow-medium transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback>
                  <User className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{user.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={getRoleColor(user.role)} variant="secondary">
                    <RoleIcon className="w-3 h-3 mr-1" />
                    {user.role}
                  </Badge>
                  <Badge className={getStatusColor(user.status)} variant="outline">
                    {user.status}
                  </Badge>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-1 mb-3 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="w-3 h-3 text-muted-foreground" />
              <span className="truncate">{user.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 text-muted-foreground" />
              <span>{user.location}</span>
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
            {user.status === "active" ? (
              <Button size="sm" variant="destructive">
                <Ban className="w-3 h-3" />
              </Button>
            ) : (
              <Button size="sm" variant="secondary">
                <CheckCircle className="w-3 h-3" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const customers = users.filter(u => u.role === "customer");
  const drivers = users.filter(u => u.role === "driver");
  const mechanics = users.filter(u => u.role === "mechanic"); 
  const activeUsers = users.filter(u => u.status === "active");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage all platform users</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{users.length}</p>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{customers.length}</p>
              <p className="text-sm text-muted-foreground">Customers</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{drivers.length}</p>
              <p className="text-sm text-muted-foreground">Drivers</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">{activeUsers.length}</p>
              <p className="text-sm text-muted-foreground">Active</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="Search users..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({users.length})</TabsTrigger>
          <TabsTrigger value="customers">Customers ({customers.length})</TabsTrigger>
          <TabsTrigger value="drivers">Drivers ({drivers.length})</TabsTrigger>
          <TabsTrigger value="mechanics">Mechanics ({mechanics.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="customers">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {customers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="drivers">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {drivers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mechanics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {mechanics.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserManagement;
