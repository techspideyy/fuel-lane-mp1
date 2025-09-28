import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  User, Settings as SettingsIcon, Bell, Shield, CreditCard, 
  MapPin, Phone, Mail, Camera, Trash2, Save, Edit3,
  Smartphone, Lock, Globe, Eye, EyeOff
} from "lucide-react";
import { useState } from "react";

const Settings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    sms: true,
    push: true
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: "Home",
      address: "123 Main Street, Apt 4B",
      city: "New York, NY 10001",
      isDefault: true
    },
    {
      id: 2,
      label: "Work", 
      address: "456 Business Ave, Suite 200",
      city: "New York, NY 10002",
      isDefault: false
    }
  ]);

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "Visa",
      last4: "4242",
      expiry: "12/25",
      isDefault: true
    },
    {
      id: 2,
      type: "Mastercard",
      last4: "8888",
      expiry: "09/26",
      isDefault: false
    }
  ]);

  return (
    <DashboardLayout userRole="user">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings & Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="space-y-6">
              {/* Profile Picture */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profile Picture
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
                      <AvatarFallback className="text-lg">JD</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <Button variant="outline">
                        <Camera className="w-4 h-4 mr-2" />
                        Upload New Photo
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove Photo
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">First Name</label>
                        <Input defaultValue="John" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Last Name</label>
                        <Input defaultValue="Doe" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input type="email" defaultValue="john.doe@email.com" />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Phone Number</label>
                      <Input type="tel" defaultValue="+1 (555) 123-4567" />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Bio</label>
                      <Textarea 
                        placeholder="Tell us about yourself..." 
                        defaultValue="Regular customer who loves the convenient fuel delivery service."
                      />
                    </div>
                    
                    <Button className="w-full">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="account">
            <div className="space-y-6">
              {/* Account Security */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Account Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Current Password</label>
                    <div className="relative">
                      <Input 
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">New Password</label>
                    <Input type="password" placeholder="Enter new password" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Confirm New Password</label>
                    <Input type="password" placeholder="Confirm new password" />
                  </div>
                  
                  <Button>
                    <Lock className="w-4 h-4 mr-2" />
                    Update Password
                  </Button>
                </CardContent>
              </Card>

              {/* Two-Factor Authentication */}
              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">SMS Authentication</h3>
                      <p className="text-sm text-muted-foreground">Receive codes via SMS</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Authenticator App</h3>
                      <p className="text-sm text-muted-foreground">Use Google Authenticator or similar</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Setup
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Account Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-destructive">Danger Zone</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg">
                    <div>
                      <h3 className="font-medium">Delete Account</h3>
                      <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                    </div>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Choose how you want to be notified
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Order Updates</h3>
                      <p className="text-sm text-muted-foreground">Get notified about your order status</p>
                    </div>
                    <Switch 
                      checked={notifications.orderUpdates}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, orderUpdates: checked }))
                      }
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Promotions & Offers</h3>
                      <p className="text-sm text-muted-foreground">Receive special offers and discounts</p>
                    </div>
                    <Switch 
                      checked={notifications.promotions}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, promotions: checked }))
                      }
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Newsletter</h3>
                      <p className="text-sm text-muted-foreground">Weekly updates and fuel tips</p>
                    </div>
                    <Switch 
                      checked={notifications.newsletter}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, newsletter: checked }))
                      }
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">SMS Notifications</h3>
                      <p className="text-sm text-muted-foreground">Receive text message updates</p>
                    </div>
                    <Switch 
                      checked={notifications.sms}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, sms: checked }))
                      }
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Push Notifications</h3>
                      <p className="text-sm text-muted-foreground">Browser and mobile push notifications</p>
                    </div>
                    <Switch 
                      checked={notifications.push}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, push: checked }))
                      }
                    />
                  </div>
                </div>
                
                <Button className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="addresses">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Saved Addresses
                  </CardTitle>
                  <Button>
                    Add New Address
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div key={address.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{address.label}</h3>
                              {address.isDefault && (
                                <Badge variant="secondary">Default</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{address.address}</p>
                            <p className="text-sm text-muted-foreground">{address.city}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit3 className="w-3 h-3 mr-1" />
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="payments">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Methods
                  </CardTitle>
                  <Button>
                    Add Payment Method
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paymentMethods.map((payment) => (
                      <div key={payment.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center text-white text-xs font-semibold">
                              {payment.type === "Visa" ? "VISA" : "MC"}
                            </div>
                            <div>
                              <p className="font-medium">**** **** **** {payment.last4}</p>
                              <p className="text-sm text-muted-foreground">Expires {payment.expiry}</p>
                            </div>
                            {payment.isDefault && (
                              <Badge variant="secondary">Default</Badge>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit3 className="w-3 h-3 mr-1" />
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Billing History */}
              <Card>
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Fuel Delivery #FD-2024-001</p>
                        <p className="text-sm text-muted-foreground">December 19, 2024</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹7182.00</p>
                        <Button variant="ghost" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Vehicle Service #VS-2024-002</p>
                        <p className="text-sm text-muted-foreground">December 15, 2024</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹21000.00</p>
                        <Button variant="ghost" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
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

export default Settings;