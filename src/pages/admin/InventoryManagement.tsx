import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, Search, Plus, Filter, Edit3, Eye, AlertTriangle,
  TrendingUp, TrendingDown, Truck, IndianRupee, BarChart3
} from "lucide-react";

const InventoryManagement = () => {
  const inventory = [
    {
      id: "INV-001",
      name: "Motor Oil 5W-30",
      category: "Fluids",
      quantity: 45,
      minStock: 20,
      maxStock: 100,
      unit: "bottles",
      price: 8.99,
      supplier: "Mobil",
      lastRestocked: "2024-12-15",
      status: "in-stock"
    },
    {
      id: "INV-002", 
      name: "Brake Pads",
      category: "Parts",
      quantity: 8,
      minStock: 15,
      maxStock: 50,
      unit: "sets",
      price: 89.99,
      supplier: "Brembo",
      lastRestocked: "2024-12-10",
      status: "low-stock"
    },
    {
      id: "INV-003",
      name: "Air Filters",
      category: "Filters",
      quantity: 32,
      minStock: 25,
      maxStock: 75,
      unit: "pieces",
      price: 24.99,
      supplier: "K&N",
      lastRestocked: "2024-12-18",
      status: "in-stock"
    },
    {
      id: "INV-004",
      name: "Spark Plugs",
      category: "Parts",
      quantity: 2,
      minStock: 10,
      maxStock: 40,
      unit: "sets",
      price: 45.99,
      supplier: "NGK",
      lastRestocked: "2024-11-25",
      status: "critical"
    }
  ];

  const suppliers = [
    {
      id: "SUP-001",
      name: "Mobil",
      contact: "orders@mobil.com",
      phone: "+1 800-555-0101",
      products: 15,
      reliability: 98,
      avgDelivery: "2-3 days"
    },
    {
      id: "SUP-002",
      name: "Brembo",
      contact: "sales@brembo.com", 
      phone: "+1 800-555-0102",
      products: 8,
      reliability: 95,
      avgDelivery: "3-5 days"
    },
    {
      id: "SUP-003",
      name: "K&N",
      contact: "service@kandn.com",
      phone: "+1 800-555-0103",
      products: 12,
      reliability: 92,
      avgDelivery: "1-2 days"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-stock": return "bg-accent text-accent-foreground";
      case "low-stock": return "bg-secondary text-secondary-foreground";
      case "critical": return "bg-destructive text-destructive-foreground";
      case "out-of-stock": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStockPercentage = (current: number, max: number) => {
    return Math.round((current / max) * 100);
  };

  const getStockStatus = (current: number, min: number) => {
    if (current === 0) return "out-of-stock";
    if (current < min * 0.5) return "critical";
    if (current < min) return "low-stock";
    return "in-stock";
  };

  const InventoryCard = ({ item }: { item: any }) => {
    const stockPercentage = getStockPercentage(item.quantity, item.maxStock);
    const actualStatus = getStockStatus(item.quantity, item.minStock);
    
    return (
      <Card className="hover:shadow-medium transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <Badge variant="outline" className="mt-1">
                {item.category}
              </Badge>
            </div>
            <Badge className={getStatusColor(actualStatus)}>
              {actualStatus.replace('-', ' ')}
            </Badge>
          </div>

          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span>Stock Level</span>
              <span>{item.quantity} / {item.maxStock} {item.unit}</span>
            </div>
            <Progress value={stockPercentage} className="h-2" />
            {item.quantity < item.minStock && (
              <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Below minimum stock ({item.minStock} {item.unit})
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
            <div>
              <p className="text-muted-foreground">Price</p>
              <p className="font-bold">₹{item.price}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Supplier</p>
              <p className="font-bold">{item.supplier}</p>
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
            <Button size="sm" className="bg-primary">
              <Plus className="w-3 h-3 mr-1" />
              Restock
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const SupplierCard = ({ supplier }: { supplier: any }) => (
    <Card className="hover:shadow-medium transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold">{supplier.name}</h3>
            <p className="text-sm text-muted-foreground">{supplier.contact}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-accent">{supplier.reliability}%</p>
            <p className="text-xs text-muted-foreground">Reliability</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
          <div>
            <p className="text-muted-foreground">Products</p>
            <p className="font-bold">{supplier.products}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Delivery</p>
            <p className="font-bold">{supplier.avgDelivery}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1">
            <Eye className="w-3 h-3 mr-1" />
            View
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <Truck className="w-3 h-3 mr-1" />
            Order
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const criticalItems = inventory.filter(item => item.quantity < item.minStock * 0.5);
  const lowStockItems = inventory.filter(item => item.quantity < item.minStock && item.quantity >= item.minStock * 0.5);

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Inventory Management</h1>
            <p className="text-muted-foreground">Track parts and supplies</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{inventory.length}</p>
                <p className="text-sm text-muted-foreground">Total Items</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-destructive">{criticalItems.length}</p>
                <p className="text-sm text-muted-foreground">Critical Stock</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-secondary">{lowStockItems.length}</p>
                <p className="text-sm text-muted-foreground">Low Stock</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">{suppliers.length}</p>
                <p className="text-sm text-muted-foreground">Suppliers</p>
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
        <Tabs defaultValue="inventory" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="inventory">Inventory ({inventory.length})</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers ({suppliers.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {inventory.map((item) => (
                <InventoryCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="suppliers" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suppliers.map((supplier) => (
                <SupplierCard key={supplier.id} supplier={supplier} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default InventoryManagement;