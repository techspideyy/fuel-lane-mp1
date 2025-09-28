import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Fuel, 
  MapPin, 
  Calendar as CalendarIcon, 
  Clock, 
  CreditCard,
  Truck,
  CheckCircle,
  Plus,
  Minus
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const FuelOrder = () => {
  const [selectedFuel, setSelectedFuel] = useState("");
  const [quantity, setQuantity] = useState(50);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [deliveryDate, setDeliveryDate] = useState<Date>();
  const [deliveryTime, setDeliveryTime] = useState("");
  const [location, setLocation] = useState("");

  const fuelTypes = [
    { id: "petrol", name: "Petrol", price: 102.50, icon: "⛽", color: "bg-red-500" },
    { id: "diesel", name: "Diesel", price: 89.30, icon: "🚛", color: "bg-blue-500" },
    { id: "premium", name: "Premium Petrol", price: 108.75, icon: "✨", color: "bg-yellow-500" },
    { id: "cng", name: "CNG", price: 75.20, icon: "🌿", color: "bg-green-500" }
  ];

  const vehicles = [
    { id: "1", name: "Honda Civic", plate: "MH 01 AB 1234", fuelType: "petrol" },
    { id: "2", name: "Toyota Prius", plate: "MH 02 CD 5678", fuelType: "premium" }
  ];

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const selectedFuelData = fuelTypes.find(f => f.id === selectedFuel);
  const totalAmount = selectedFuelData ? selectedFuelData.price * quantity : 0;
  const deliveryFee = 25;
  const finalTotal = totalAmount + deliveryFee;

  const handleQuantityChange = (increment: boolean) => {
    setQuantity(prev => {
      const newValue = increment ? prev + 5 : prev - 5;
      return Math.max(5, Math.min(200, newValue));
    });
  };

  return (
    <DashboardLayout userRole="user">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-fuel-gradient rounded-lg p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Order Fuel Delivery</h1>
          <p className="text-white/90">Get fuel delivered to your location within 30 minutes</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Fuel Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Fuel className="w-5 h-5" />
                  Select Fuel Type
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {fuelTypes.map((fuel) => (
                    <div
                      key={fuel.id}
                      className={cn(
                        "p-4 border rounded-lg cursor-pointer transition-all hover:shadow-medium",
                        selectedFuel === fuel.id 
                          ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
                          : "border-border hover:border-primary/50"
                      )}
                      onClick={() => setSelectedFuel(fuel.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 ${fuel.color} rounded-full flex items-center justify-center text-white text-lg`}>
                            {fuel.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold">{fuel.name}</h3>
                            <p className="text-sm text-muted-foreground">Premium quality</p>
                          </div>
                        </div>
                        {selectedFuel === fuel.id && (
                          <CheckCircle className="w-6 h-6 text-primary" />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">₹{fuel.price}/L</Badge>
                        <span className="text-xs text-accent">Available</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quantity Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Quantity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-6">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(false)}
                    disabled={quantity <= 5}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary">{quantity}</div>
                    <div className="text-sm text-muted-foreground">Liters</div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(true)}
                    disabled={quantity >= 200}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex gap-2 mt-6 justify-center">
                  {[25, 50, 75, 100].map((preset) => (
                    <Button
                      key={preset}
                      variant={quantity === preset ? "default" : "outline"}
                      size="sm"
                      onClick={() => setQuantity(preset)}
                    >
                      {preset}L
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Vehicle Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Select Vehicle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicles.map((vehicle) => (
                      <SelectItem key={vehicle.id} value={vehicle.id}>
                        {vehicle.name} - {vehicle.plate}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="sm" className="mt-2">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Vehicle
                </Button>
              </CardContent>
            </Card>

            {/* Delivery Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Delivery Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="location">Delivery Location</Label>
                  <Input
                    id="location"
                    placeholder="Enter delivery address"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <Button variant="ghost" size="sm" className="mt-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    Use Current Location
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Delivery Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !deliveryDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {deliveryDate ? format(deliveryDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={deliveryDate}
                          onSelect={setDeliveryDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label htmlFor="time">Preferred Time</Label>
                    <Select value={deliveryTime} onValueChange={setDeliveryTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedFuelData && (
                  <>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 ${selectedFuelData.color} rounded-full flex items-center justify-center text-white text-sm`}>
                        {selectedFuelData.icon}
                      </div>
                      <div>
                        <p className="font-medium">{selectedFuelData.name}</p>
                        <p className="text-sm text-muted-foreground">{quantity} Liters</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Fuel Cost</span>
                        <span>₹{totalAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery Fee</span>
                        <span>₹{deliveryFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>GST (18%)</span>
                        <span>₹{(finalTotal * 0.18).toFixed(2)}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹{(finalTotal * 1.18).toFixed(2)}</span>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Delivery in 30-45 minutes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>Quality guaranteed</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-fuel-gradient hover:opacity-90" 
                      size="lg"
                      disabled={!selectedFuel || !location || !deliveryDate || !deliveryTime}
                    >
                      Proceed to Payment
                    </Button>
                  </>
                )}

                {!selectedFuelData && (
                  <div className="text-center py-8">
                    <Fuel className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">Select fuel type to see summary</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FuelOrder;