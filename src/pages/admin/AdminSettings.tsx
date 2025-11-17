import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  Settings, Save, RefreshCw, Bell, Shield, Globe, 
  Database, Mail, IndianRupee, Clock
} from "lucide-react";

const AdminSettings = () => {
  return (
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

        {/* GENERAL */}
        <TabsContent value="general" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Company Info */}
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
                {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map((day) => (
                  <div key={day} className="grid grid-cols-3 gap-2 items-center">
                    <Label>{day}</Label>
                    <Input defaultValue={day === "Saturday" ? "09:00" : "08:00"} type="time" />
                    <Input defaultValue={day === "Saturday" ? "16:00" : "18:00"} type="time" />
                  </div>
                ))}

                <div className="grid grid-cols-3 gap-2 items-center">
                  <Label>Sunday</Label>
                  <span className="text-sm text-muted-foreground">Closed</span>
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
                {[
                  ["Maintenance Mode", "Enable to prevent new orders during maintenance"],
                  ["New User Registration", "Allow new users to create accounts"],
                  ["Automatic Order Assignment", "Assign orders to available drivers"],
                  ["SMS Notifications", "Send SMS updates to customers"],
                ].map(([label, desc], i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <Label>{label}</Label>
                      <p className="text-sm text-muted-foreground">{desc}</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* NOTIFICATIONS */}
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
                {[
                  "New Order Alerts",
                  "Payment Confirmations",
                  "Service Reminders",
                  "System Alerts",
                ].map((label, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <Label>{label}</Label>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
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
                {[
                  "Order Updates",
                  "Driver Notifications",
                  "Promotional Messages",
                  "Emergency Alerts",
                ].map((label, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <Label>{label}</Label>
                    </div>
                    <Switch defaultChecked={i !== 2} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* SECURITY */}
        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Authentication
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "Two-Factor Authentication",
                  "Password Complexity",
                ].map((label, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <Label>{label}</Label>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}

                <div>
                  <Label>Session Timeout (minutes)</Label>
                  <Input type="number" defaultValue="60" />
                </div>

                <div>
                  <Label>Max Login Attempts</Label>
                  <Input type="number" defaultValue="5" />
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
                {[
                  "Data Encryption",
                  "Activity Logging",
                  "Data Backup",
                ].map((label, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <Label>{label}</Label>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}

                <div>
                  <Label>Backup Retention (days)</Label>
                  <Input type="number" defaultValue="30" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* PAYMENT */}
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
                    <Label>Stripe Public Key</Label>
                    <Input placeholder="pk_live_..." />
                  </div>
                  <div>
                    <Label>Stripe Secret Key</Label>
                    <Input type="password" placeholder="sk_live_..." />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Apple Pay</Label>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Google Pay</Label>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Default Currency</Label>
                    <Input defaultValue="INR" />
                  </div>
                  <div>
                    <Label>Tax Rate (%)</Label>
                    <Input type="number" defaultValue="8.25" step="0.01" />
                  </div>
                  <div>
                    <Label>Service Fee (%)</Label>
                    <Input type="number" defaultValue="2.50" step="0.01" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Automatic Refunds</Label>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* INTEGRATIONS */}
        <TabsContent value="integrations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* API Keys */}
            <Card>
              <CardHeader>
                <CardTitle>API Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Google Maps API Key</Label>
                  <Input placeholder="AIza..." />
                </div>
                <div>
                  <Label>Twilio Account SID</Label>
                  <Input placeholder="AC..." />
                </div>
                <div>
                  <Label>Twilio Auth Token</Label>
                  <Input type="password" />
                </div>
                <div>
                  <Label>SendGrid API Key</Label>
                  <Input type="password" placeholder="SG..." />
                </div>
              </CardContent>
            </Card>

            {/* Third-party Services */}
            <Card>
              <CardHeader>
                <CardTitle>Third-party Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "Google Analytics",
                  "Push Notifications",
                  "Customer Support Chat",
                  "Social Media Login",
                ].map((label, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <Label>{label}</Label>
                    </div>
                    <Switch defaultChecked={i < 2} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default AdminSettings;
