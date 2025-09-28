import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Truck, 
  Bell,
  Shield,
  CreditCard,
  MapPin,
  Clock,
  Camera,
  Save,
  Edit3,
  Phone,
  Mail,
  Home,
  Fuel,
  Star,
  FileText
} from "lucide-react";

const DriverSettings = () => {
  const [notifications, setNotifications] = useState({
    newDeliveries: true,
    paymentUpdates: true,
    maintenanceAlerts: true,
    ratingUpdates: false,
    systemUpdates: true
  });

  const driverProfile = {
    name: "Amit Kumar",
    email: "amit.kumar@fuelpro.com",
    phone: "+91 9876543210",
    employeeId: "DRV-2024-001",
    joinDate: "March 15, 2023",
    address: "123 Driver Colony, Sector 18, Noida",
    licenseNumber: "DL-123456789",
    rating: 4.8,
    totalDeliveries: 2456,
    status: "active"
  };

  const vehicleDetails = {
    model: "Tata Ace Gold",
    plateNumber: "DL 8C AB 1234",
    registrationDate: "2022-08-15",
    capacity: "500L",
    lastService: "2024-01-10",
    nextService: "2024-04-10",
    insuranceExpiry: "2024-12-31"
  };

  const bankDetails = {
    accountHolder: "Amit Kumar",
    accountNumber: "****1234",
    ifscCode: "HDFC0001234",
    bankName: "HDFC Bank"
  };

  return (
    <DashboardLayout userRole="driver">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-fuel-gradient rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Settings</h1>
              <p className="text-white/90">Manage your profile and preferences</p>
            </div>
            <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" defaultValue={driverProfile.name} />
                    </div>
                    <div>
                      <Label htmlFor="employeeId">Employee ID</Label>
                      <Input id="employeeId" defaultValue={driverProfile.employeeId} disabled />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue={driverProfile.email} />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue={driverProfile.phone} />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" defaultValue={driverProfile.address} />
                    </div>
                    <div>
                      <Label htmlFor="license">License Number</Label>
                      <Input id="license" defaultValue={driverProfile.licenseNumber} />
                    </div>
                    <div>
                      <Label htmlFor="joinDate">Join Date</Label>
                      <Input id="joinDate" defaultValue={driverProfile.joinDate} disabled />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Photo</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <Avatar className="w-24 h-24 mx-auto">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>AK</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      <Camera className="w-4 h-4 mr-2" />
                      Change Photo
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="font-medium">{driverProfile.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Deliveries</span>
                      <span className="font-medium">{driverProfile.totalDeliveries}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Status</span>
                      <Badge className="bg-accent text-accent-foreground">Active</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Vehicle Settings */}
          <TabsContent value="vehicle">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Vehicle Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="vehicleModel">Vehicle Model</Label>
                      <Input id="vehicleModel" defaultValue={vehicleDetails.model} />
                    </div>
                    <div>
                      <Label htmlFor="plateNumber">Plate Number</Label>
                      <Input id="plateNumber" defaultValue={vehicleDetails.plateNumber} />
                    </div>
                    <div>
                      <Label htmlFor="registrationDate">Registration Date</Label>
                      <Input id="registrationDate" defaultValue={vehicleDetails.registrationDate} />
                    </div>
                    <div>
                      <Label htmlFor="capacity">Fuel Capacity</Label>
                      <Input id="capacity" defaultValue={vehicleDetails.capacity} />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="lastService">Last Service Date</Label>
                      <Input id="lastService" defaultValue={vehicleDetails.lastService} />
                    </div>
                    <div>
                      <Label htmlFor="nextService">Next Service Due</Label>
                      <Input id="nextService" defaultValue={vehicleDetails.nextService} />
                    </div>
                    <div>
                      <Label htmlFor="insuranceExpiry">Insurance Expiry</Label>
                      <Input id="insuranceExpiry" defaultValue={vehicleDetails.insuranceExpiry} />
                    </div>
                    <Button className="w-full">
                      <FileText className="w-4 h-4 mr-2" />
                      Upload Documents
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="newDeliveries">New Delivery Assignments</Label>
                      <p className="text-sm text-muted-foreground">Get notified when new deliveries are assigned</p>
                    </div>
                    <Switch 
                      id="newDeliveries"
                      checked={notifications.newDeliveries}
                      onCheckedChange={(checked) => setNotifications(prev => ({...prev, newDeliveries: checked}))}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="paymentUpdates">Payment Updates</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications for payment confirmations</p>
                    </div>
                    <Switch 
                      id="paymentUpdates"
                      checked={notifications.paymentUpdates}
                      onCheckedChange={(checked) => setNotifications(prev => ({...prev, paymentUpdates: checked}))}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="maintenanceAlerts">Vehicle Maintenance Alerts</Label>
                      <p className="text-sm text-muted-foreground">Get reminded about vehicle service schedules</p>
                    </div>
                    <Switch 
                      id="maintenanceAlerts"
                      checked={notifications.maintenanceAlerts}
                      onCheckedChange={(checked) => setNotifications(prev => ({...prev, maintenanceAlerts: checked}))}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="ratingUpdates">Rating & Review Updates</Label>
                      <p className="text-sm text-muted-foreground">Be notified when customers rate your service</p>
                    </div>
                    <Switch 
                      id="ratingUpdates"
                      checked={notifications.ratingUpdates}
                      onCheckedChange={(checked) => setNotifications(prev => ({...prev, ratingUpdates: checked}))}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="systemUpdates">System Updates</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications about app updates and features</p>
                    </div>
                    <Switch 
                      id="systemUpdates"
                      checked={notifications.systemUpdates}
                      onCheckedChange={(checked) => setNotifications(prev => ({...prev, systemUpdates: checked}))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="accountHolder">Account Holder Name</Label>
                      <Input id="accountHolder" defaultValue={bankDetails.accountHolder} />
                    </div>
                    <div>
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input id="accountNumber" defaultValue={bankDetails.accountNumber} type="password" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="ifscCode">IFSC Code</Label>
                      <Input id="ifscCode" defaultValue={bankDetails.ifscCode} />
                    </div>
                    <div>
                      <Label htmlFor="bankName">Bank Name</Label>
                      <Input id="bankName" defaultValue={bankDetails.bankName} />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium mb-2">Payment Schedule</h4>
                  <p className="text-sm text-muted-foreground">
                    Payments are processed weekly on Fridays. Earnings from Monday to Sunday are paid the following Friday.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Change Password
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button>Update Password</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Location Tracking</Label>
                      <p className="text-sm text-muted-foreground">Allow location tracking for delivery optimization</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Data Analytics</Label>
                      <p className="text-sm text-muted-foreground">Share performance data for service improvement</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DriverSettings;