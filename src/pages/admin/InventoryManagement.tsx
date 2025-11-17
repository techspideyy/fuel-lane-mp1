import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Package, RefreshCcw } from "lucide-react";

export default function InventoryManagement() {
  // ------------------------------
  // Static Dummy Data
  // ------------------------------
  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: "Engine Oil",
      quantity: 120,
      category: "Fluids",
      supplier: "AutoCare Supplies",
    },
    {
      id: 2,
      name: "Brake Pads",
      quantity: 40,
      category: "Parts",
      supplier: "Speedster Co.",
    },
    {
      id: 3,
      name: "Air Filters",
      quantity: 75,
      category: "Parts",
      supplier: "FilterMax Inc.",
    },
  ]);

  const [newItem, setNewItem] = useState({
    name: "",
    quantity: "",
    category: "",
    supplier: "",
  });

  const [editItem, setEditItem] = useState<any>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // ------------------------------
  // Add Item
  // ------------------------------
  const handleAdd = () => {
    const newEntry = {
      id: Date.now(),
      name: newItem.name,
      quantity: Number(newItem.quantity),
      category: newItem.category,
      supplier: newItem.supplier,
    };

    setInventory([...inventory, newEntry]);
    setNewItem({ name: "", quantity: "", category: "", supplier: "" });
    setIsAddOpen(false);
  };

  // ------------------------------
  // Edit Item
  // ------------------------------
  const handleEdit = () => {
    setInventory(
      inventory.map((item) =>
        item.id === editItem.id ? { ...editItem } : item
      )
    );
    setIsEditOpen(false);
  };

  // ------------------------------
  // Delete Item
  // ------------------------------
  const handleDelete = (id: number) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  // ------------------------------
  // Restock
  // ------------------------------
  const handleRestock = (id: number) => {
    setInventory(
      inventory.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 10 } : item
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* -------------------------------- */}
      {/* Header */}
      {/* -------------------------------- */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Inventory Management</h2>
        <Button onClick={() => setIsAddOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Item
        </Button>
      </div>

      {/* -------------------------------- */}
      {/* Inventory List */}
      {/* -------------------------------- */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Inventory Items
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inventory.map((item) => (
              <Card key={item.id} className="border shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {item.name}
                    <Badge variant={item.quantity < 50 ? "destructive" : "secondary"}>
                      {item.quantity} pcs
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p>
                    <strong>Category:</strong> {item.category}
                  </p>
                  <p>
                    <strong>Supplier:</strong> {item.supplier}
                  </p>

                  <div className="flex justify-between pt-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditItem(item);
                        setIsEditOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4 mr-1" /> Edit
                    </Button>

                    <Button variant="outline" onClick={() => handleRestock(item.id)}>
                      <RefreshCcw className="w-4 h-4 mr-1" /> Restock
                    </Button>

                    <Button variant="destructive" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="w-4 h-4 mr-1" /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* -------------------------------- */}
      {/* Add Item Dialog */}
      {/* -------------------------------- */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Inventory Item</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            <Input
              placeholder="Item Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Quantity"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
            />
            <Input
              placeholder="Category"
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            />
            <Input
              placeholder="Supplier"
              value={newItem.supplier}
              onChange={(e) =>
                setNewItem({ ...newItem, supplier: e.target.value })
              }
            />
          </div>

          <DialogFooter>
            <Button onClick={handleAdd}>Add Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* -------------------------------- */}
      {/* Edit Item Dialog */}
      {/* -------------------------------- */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Inventory Item</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            <Input
              placeholder="Item Name"
              value={editItem?.name || ""}
              onChange={(e) =>
                setEditItem({ ...editItem, name: e.target.value })
              }
            />
            <Input
              type="number"
              placeholder="Quantity"
              value={editItem?.quantity || ""}
              onChange={(e) =>
                setEditItem({ ...editItem, quantity: Number(e.target.value) })
              }
            />
            <Input
              placeholder="Category"
              value={editItem?.category || ""}
              onChange={(e) =>
                setEditItem({ ...editItem, category: e.target.value })
              }
            />
            <Input
              placeholder="Supplier"
              value={editItem?.supplier || ""}
              onChange={(e) =>
                setEditItem({ ...editItem, supplier: e.target.value })
              }
            />
          </div>

          <DialogFooter>
            <Button onClick={handleEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
