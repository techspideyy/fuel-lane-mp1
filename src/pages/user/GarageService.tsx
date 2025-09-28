import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Wrench, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin,
  Star,
  CheckCircle,
  AlertTriangle,
  Car,
  Settings
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const GarageService = () => {
  const [selectedService, setSelectedService] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [serviceDate, setServiceDate] = useState<Date>();
  const [serviceTime, setServiceTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const serviceCategories = [
    {
      id: "maintenance",
      name: "Regular Maintenance",
      icon: Settings,
      color: "bg-primary",
      services: [
        { id: "oil-change", name: "Oil Change", price: 1200, duration: "45 min", description: "Engine oil and filter replacement" },
        { id: "tire-rotation", name: "Tire Rotation", price: 800, duration: "30 min", description: "Rotate tires for even wear" },
        { id: "brake-check", name: "Brake Inspection", price: 500, duration: "30 min", description: "Complete brake system check" },
      ]
    },
    {
      id: "repair",
      name: "Repairs",
      icon: Wrench,
      color: "bg-secondary",
      services: [
        { id: "engine-repair", name: "Engine Repair", price: 5000, duration: "3-4 hours", description: "Engine diagnostics and repair" },
        { id: "transmission", name: "Transmission Service", price: 3500, duration: "2-3 hours", description: "Transmission fluid and service" },
        { id: "ac-repair", name: "AC Repair", price: 2500, duration: "1-2 hours", description: "Air conditioning system repair" },
      ]
    },
    {
      id: "emergency",
      name: "Emergency Service",
      icon: AlertTriangle,
      color: "bg-destructive",
      services: [
        { id: "roadside", name: "Roadside Assistance", price: 800, duration: "30 min", description: "Emergency roadside help" },
        { id: "towing", name: "Towing Service", price: 1500, duration: "45 min", description: "Vehicle towing service" },
        { id: "jump-start", name: "Jump Start", price: 500, duration: "15 min", description: "Battery jump start service" },
      ]
    }
  ];

  const servicePackages = [
    {
      id: "basic",
      name: "Basic Service Package",
      price: 2500,
      duration: "2 hours",
      services: ["Oil Change", "Brake Check", "Tire Pressure Check"],
      savings: 300
    },
    {
      id: "premium",
      name: "Premium Service Package", 
      price: 4500,
      duration: "4 hours",
      services: ["Oil Change", "Brake Service", "Tire Rotation", "AC Check", "Battery Test"],
      savings: 800
    },
    {
      id: "comprehensive",
      name: "Comprehensive Package",
      price: 7500,
      duration: "Full Day",
      services: ["Complete Engine Service", "Brake Service", "AC Service", "Tire Service", "Electrical Check"],
      savings: 1500
    }
  ];

  const vehicles = [
    { id: "1", name: "Honda Civic", plate: "MH 01 AB 1234", year: "2020" },
    { id: "2", name: "Toyota Prius", plate: "MH 02 CD 5678", year: "2019" }
  ];

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
    "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const selectedServiceData = serviceCategories
    .flatMap(cat => cat.services)
    .find(s => s.id === selectedService);

  const selectedPackageData = servicePackages.find(p => p.id === selectedPackage);

  const totalAmount = selectedServiceData?.price || selectedPackageData?.price || 0;

  return (
    <DashboardLayout userRole="user">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-fuel-gradient rounded-lg p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Garage Services</h1>
          <p className="text-white/90">Professional automotive services at your location</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Service Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="w-5 h-5" />
                  Select Service Type
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {serviceCategories.map((category) => (
                    <div key={category.id}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-8 h-8 ${category.color} rounded-full flex items-center justify-center`}>
                          <category.icon className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="font-semibold text-lg">{category.name}</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
                        {category.services.map((service) => (
                          <div
                            key={service.id}
                            className={cn(
                              "p-4 border rounded-lg cursor-pointer transition-all hover:shadow-medium",
                              selectedService === service.id 
                                ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
                                : "border-border hover:border-primary/50"
                            )}
                            onClick={() => setSelectedService(service.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">{service.name}</h4>
                                <p className="text-sm text-muted-foreground">{service.description}</p>
                                <div className="flex items-center gap-4 mt-2">
                                  <Badge variant="secondary">₹{service.price}</Badge>
                                  <Badge variant="outline">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {service.duration}
                                  </Badge>
                                </div>
                              </div>
                              {selectedService === service.id && (
                                <CheckCircle className="w-6 h-6 text-primary" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Service Packages */}
            <Card>
              <CardHeader>
                <CardTitle>Service Packages (Save More!)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {servicePackages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={cn(
                        "p-4 border rounded-lg cursor-pointer transition-all hover:shadow-medium",
                        selectedPackage === pkg.id 
                          ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
                          : "border-border hover:border-primary/50"
                      )}
                      onClick={() => {
                        setSelectedPackage(pkg.id);
                        setSelectedService(""); // Clear individual service selection
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{pkg.name}</h4>
                            <Badge className="bg-accent text-accent-foreground">
                              Save ₹{pkg.savings}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{pkg.duration} service</p>
                          <div className="space-y-1">
                            {pkg.services.map((service, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                <CheckCircle className="w-3 h-3 text-accent" />
                                <span>{service}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">₹{pkg.price}</div>
                          {selectedPackage === pkg.id && (
                            <CheckCircle className="w-6 h-6 text-primary mt-2" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Vehicle & Booking Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="w-5 h-5" />
                  Booking Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="vehicle">Select Vehicle</Label>
                  <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicles.map((vehicle) => (
                        <SelectItem key={vehicle.id} value={vehicle.id}>
                          {vehicle.name} ({vehicle.year}) - {vehicle.plate}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="location">Service Location</Label>
                  <Input
                    id="location"
                    placeholder="Enter service address"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Our mechanic will come to your location
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Service Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !serviceDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {serviceDate ? format(serviceDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={serviceDate}
                          onSelect={setServiceDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label htmlFor="time">Preferred Time</Label>
                    <Select value={serviceTime} onValueChange={setServiceTime}>
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

                <div>
                  <Label htmlFor="description">Additional Notes</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe any specific issues or requirements..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(selectedServiceData || selectedPackageData) && (
                  <>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <h4 className="font-medium">
                        {selectedServiceData?.name || selectedPackageData?.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedServiceData?.description || 
                         `${selectedPackageData?.services.length} services included`}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary">
                          ₹{totalAmount}
                        </Badge>
                        <Badge variant="outline">
                          <Clock className="w-3 h-3 mr-1" />
                          {selectedServiceData?.duration || selectedPackageData?.duration}
                        </Badge>
                      </div>
                    </div>

                    {selectedPackageData && (
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm">Included Services:</h5>
                        {selectedPackageData.services.map((service, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-3 h-3 text-accent" />
                            <span>{service}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Service Cost</span>
                        <span>₹{totalAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Travel Charges</span>
                        <span>₹100</span>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>GST (18%)</span>
                        <span>₹{((totalAmount + 100) * 0.18).toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="border-t pt-2">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>₹{((totalAmount + 100) * 1.18).toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>4.8★ rated mechanics</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-accent" />
                        <span>30-day service warranty</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-fuel-gradient hover:opacity-90" 
                      size="lg"
                      disabled={!selectedVehicle || !location || !serviceDate || !serviceTime}
                    >
                      Book Service
                    </Button>
                  </>
                )}

                {!selectedServiceData && !selectedPackageData && (
                  <div className="text-center py-8">
                    <Wrench className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">Select a service to see booking details</p>
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

export default GarageService;