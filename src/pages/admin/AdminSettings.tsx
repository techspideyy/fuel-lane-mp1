import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  Settings, Save, RefreshCw, Bell, Shield, Globe, 
  Database, Mail, Phone, MapPin, IndianRupee, Clock
} from "lucide-react";

const AdminSettings = () => {
  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">System Settings</h1>
            <p className="text-muted-foreground">Configure platform settings and preferences</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Company Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Company Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" defaultValue="FuelPro Services" />
                  </div>
                  <div>
                    <Label htmlFor="company-email">Email</Label>
                    <Input id="company-email" type="email" defaultValue="info@fuelpro.com" />
                  </div>
                  <div>
                    <Label htmlFor="company-phone">Phone</Label>
                    <Input id="company-phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div>
                    <Label htmlFor="company-address">Address</Label>
                    <Textarea id="company-address" defaultValue="123 Business St, Suite 100, City, State 12345" />
                  </div>
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-2 items-center">
                    <Label>Monday</Label>
                    <Input defaultValue="08:00" type="time" />
                    <Input defaultValue="18:00" type="time" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 items-center">
                    <Label>Tuesday</Label>
                    <Input defaultValue="08:00" type="time" />
                    <Input defaultValue="18:00" type="time" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 items-center">
                    <Label>Wednesday</Label>
                    <Input defaultValue="08:00" type="time" />
                    <Input defaultValue="18:00" type="time" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 items-center">
                    <Label>Thursday</Label>
                    <Input defaultValue="08:00" type="time" />
                    <Input defaultValue="18:00" type="time" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 items-center">
                    <Label>Friday</Label>
                    <Input defaultValue="08:00" type="time" />
                    <Input defaultValue="18:00" type="time" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 items-center">
                    <Label>Saturday</Label>
                    <Input defaultValue="09:00" type="time" />
                    <Input defaultValue="16:00" type="time" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 items-center">
                    <Label>Sunday</Label>
                    <span className="text-sm text-muted-foreground">Closed</span>
                    <div></div>
                  </div>
                </CardContent>
              </Card>

              {/* Platform Settings */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Platform Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">Enable to prevent new orders during maintenance</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>New User Registration</Label>
                      <p className="text-sm text-muted-foreground">Allow new users to create accounts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Automatic Order Assignment</Label>
                      <p className="text-sm text-muted-foreground">Automatically assign orders to available drivers</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send SMS updates to customers</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Email Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Email Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>New Order Alerts</Label>
                      <p className="text-sm text-muted-foreground">Notify when new orders are placed</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Payment Confirmations</Label>
                      <p className="text-sm text-muted-foreground">Send payment confirmation emails</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Service Reminders</Label>
                      <p className="text-sm text-muted-foreground">Send service appointment reminders</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>System Alerts</Label>
                      <p className="text-sm text-muted-foreground">Critical system notifications</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              {/* Push Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Push Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Order Updates</Label>
                      <p className="text-sm text-muted-foreground">Real-time order status updates</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Driver Notifications</Label>
                      <p className="text-sm text-muted-foreground">Notify drivers of new assignments</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Promotional Messages</Label>
                      <p className="text-sm text-muted-foreground">Send promotional notifications</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Emergency Alerts</Label>
                      <p className="text-sm text-muted-foreground">Critical emergency notifications</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Authentication Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Authentication
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Password Complexity</Label>
                      <p className="text-sm text-muted-foreground">Enforce strong password requirements</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div>
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input id="session-timeout" type="number" defaultValue="60" />
                  </div>
                  <div>
                    <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
                    <Input id="max-login-attempts" type="number" defaultValue="5" />
                  </div>
                </CardContent>
              </Card>

              {/* Data Protection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Data Protection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Data Encryption</Label>
                      <p className="text-sm text-muted-foreground">Encrypt sensitive data at rest</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Activity Logging</Label>
                      <p className="text-sm text-muted-foreground">Log all user activities</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Data Backup</Label>
                      <p className="text-sm text-muted-foreground">Automatic daily backups</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div>
                    <Label htmlFor="backup-retention">Backup Retention (days)</Label>
                    <Input id="backup-retention" type="number" defaultValue="30" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="payment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IndianRupee className="w-5 h-5" />
                  Payment Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="stripe-key">Stripe Public Key</Label>
                      <Input id="stripe-key" placeholder="pk_live_..." />
                    </div>
                    <div>
                      <Label htmlFor="stripe-secret">Stripe Secret Key</Label>
                      <Input id="stripe-secret" type="password" placeholder="sk_live_..." />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Apple Pay</Label>
                        <p className="text-sm text-muted-foreground">Enable Apple Pay payments</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Google Pay</Label>
                        <p className="text-sm text-muted-foreground">Enable Google Pay payments</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="currency">Default Currency</Label>
                      <Input id="currency" defaultValue="INR" />
                    </div>
                    <div>
                      <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                      <Input id="tax-rate" type="number" defaultValue="8.25" step="0.01" />
                    </div>
                    <div>
                      <Label htmlFor="service-fee">Service Fee (%)</Label>
                      <Input id="service-fee" type="number" defaultValue="2.50" step="0.01" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Automatic Refunds</Label>
                        <p className="text-sm text-muted-foreground">Process refunds automatically</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* API Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>API Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="google-maps-key">Google Maps API Key</Label>
                    <Input id="google-maps-key" placeholder="AIza..." />
                  </div>
                  <div>
                    <Label htmlFor="twilio-sid">Twilio Account SID</Label>
                    <Input id="twilio-sid" placeholder="AC..." />
                  </div>
                  <div>
                    <Label htmlFor="twilio-token">Twilio Auth Token</Label>
                    <Input id="twilio-token" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="sendgrid-key">SendGrid API Key</Label>
                    <Input id="sendgrid-key" type="password" placeholder="SG..." />
                  </div>
                </CardContent>
              </Card>

              {/* Third-party Services */}
              <Card>
                <CardHeader>
                  <CardTitle>Third-party Services</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Google Analytics</Label>
                      <p className="text-sm text-muted-foreground">Track website analytics</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Firebase Cloud Messaging</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Customer Support Chat</Label>
                      <p className="text-sm text-muted-foreground">Live chat integration</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Social Media Login</Label>
                      <p className="text-sm text-muted-foreground">OAuth integration</p>
                    </div>
                    <Switch />
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

export default AdminSettings;