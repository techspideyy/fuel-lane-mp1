import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Package, 
  Search, 
  Plus, 
  Filter,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Edit3,
  ShoppingCart,
  Truck,
  BarChart3
} from "lucide-react";

const InventoryManagement = () => {
  const inventoryItems = [
    { 
      id: "INV-001", 
      name: "Engine Oil (5W-30)", 
      category: "Fluids", 
      stock: 5, 
      threshold: 10, 
      status: "low",
      price: 24.99,
      supplier: "Valvoline",
      lastOrdered: "2024-12-15"
    },
    { 
      id: "INV-002", 
      name: "Brake Pads", 
      category: "Brakes", 
      stock: 2, 
      threshold: 5, 
      status: "critical",
      price: 89.99,
      supplier: "Brembo",
      lastOrdered: "2024-12-10"
    },
    { 
      id: "INV-003", 
      name: "Air Filters", 
      category: "Filters", 
      stock: 15, 
      threshold: 8, 
      status: "good",
      price: 19.99,
      supplier: "K&N",
      lastOrdered: "2024-12-18"
    },
    { 
      id: "INV-004", 
      name: "Spark Plugs", 
      category: "Engine", 
      stock: 8, 
      threshold: 12, 
      status: "low",
      price: 12.99,
      supplier: "NGK",
      lastOrdered: "2024-12-12"
    },
    { 
      id: "INV-005", 
      name: "Transmission Fluid", 
      category: "Fluids", 
      stock: 20, 
      threshold: 8, 
      status: "good",
      price: 32.99,
      supplier: "Castrol",
      lastOrdered: "2024-12-16"
    },
    { 
      id: "INV-006", 
      name: "Timing Belt", 
      category: "Engine", 
      stock: 3, 
      threshold: 6, 
      status: "low",
      price: 145.99,
      supplier: "Gates",
      lastOrdered: "2024-12-08"
    }
  ];

  const recentOrders = [
    {
      id: "ORD-001",
      supplier: "Valvoline",
      items: 3,
      total: 245.50,
      status: "delivered",
      date: "2024-12-18"
    },
    {
      id: "ORD-002", 
      supplier: "Brembo",
      items: 2,
      total: 189.99,
      status: "pending",
      date: "2024-12-19"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "text-destructive";
      case "low": return "text-secondary";
      case "good": return "text-accent";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "critical": return "bg-destructive text-destructive-foreground";
      case "low": return "bg-secondary text-secondary-foreground";
      case "good": return "bg-accent text-accent-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "bg-accent text-accent-foreground";
      case "pending": return "bg-secondary text-secondary-foreground";
      case "shipped": return "bg-primary text-primary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const lowStockItems = inventoryItems.filter(item => item.status === "low" || item.status === "critical");
  const criticalItems = inventoryItems.filter(item => item.status === "critical");

  return (
    <DashboardLayout userRole="mechanic">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Inventory Management</h1>
            <p className="text-muted-foreground">Track and manage parts inventory</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Quick Order
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Items</p>
                  <p className="text-2xl font-bold">{inventoryItems.length}</p>
                </div>
                <Package className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Low Stock</p>
                  <p className="text-2xl font-bold text-secondary">{lowStockItems.length}</p>
                </div>
                <TrendingDown className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Critical</p>
                  <p className="text-2xl font-bold text-destructive">{criticalItems.length}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Orders Pending</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
                <Truck className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search inventory..." className="pl-10" />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Inventory Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Items ({inventoryItems.length})</TabsTrigger>
            <TabsTrigger value="low">Low Stock ({lowStockItems.length})</TabsTrigger>
            <TabsTrigger value="critical">Critical ({criticalItems.length})</TabsTrigger>
            <TabsTrigger value="orders">Orders ({recentOrders.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inventoryItems.map((item) => (
                <Card key={item.id} className="hover:shadow-medium transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                      </div>
                      <Badge className={getStatusBadge(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Stock Level</span>
                          <span className={getStatusColor(item.status)}>
                            {item.stock} / {item.threshold}
                          </span>
                        </div>
                        <Progress 
                          value={(item.stock / item.threshold) * 100} 
                          className="h-2"
                        />
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Price:</span>
                        <span className="font-medium">${item.price}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Supplier:</span>
                        <span>{item.supplier}</span>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit3 className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" className="flex-1">
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Order
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="low" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lowStockItems.map((item) => (
                <Card key={item.id} className="hover:shadow-medium transition-shadow border-secondary">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                      </div>
                      <Badge className={getStatusBadge(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Stock Level</span>
                          <span className={getStatusColor(item.status)}>
                            {item.stock} / {item.threshold}
                          </span>
                        </div>
                        <Progress 
                          value={(item.stock / item.threshold) * 100} 
                          className="h-2"
                        />
                      </div>
                      
                      <Button size="sm" className="w-full">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Reorder Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="critical" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {criticalItems.map((item) => (
                <Card key={item.id} className="hover:shadow-medium transition-shadow border-destructive">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                      </div>
                      <Badge className={getStatusBadge(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="p-3 bg-destructive/10 rounded-lg">
                        <div className="flex items-center gap-2 text-destructive text-sm">
                          <AlertTriangle className="w-4 h-4" />
                          <span>Urgent: Only {item.stock} left!</span>
                        </div>
                      </div>
                      
                      <Button size="sm" className="w-full" variant="destructive">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Order Immediately
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            {recentOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-medium transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="font-medium">{order.id}</h3>
                        <p className="text-sm text-muted-foreground">{order.supplier}</p>
                      </div>
                      <div className="text-sm">
                        <p>{order.items} items</p>
                        <p className="font-medium">${order.total}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getOrderStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">{order.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default InventoryManagement;