import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  Truck, 
  IndianRupee,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Star,
  Settings,
  Mail,
  Trash2,
  Filter
} from "lucide-react";

const DriverNotifications = () => {
  const [filter, setFilter] = useState("all");

  const notifications = [
    {
      id: "NOT-001",
      type: "delivery",
      title: "New Delivery Assignment",
      message: "You have been assigned delivery DEL-156 to Rajesh Kumar at Sector 15, Noida",
      time: "2 minutes ago",
      read: false,
      priority: "high",
      icon: Truck,
      action: "View Details"
    },
    {
      id: "NOT-002",
      type: "payment",
      title: "Payment Received",
      message: "₹156 has been credited to your account for delivery DEL-155",
      time: "15 minutes ago",
      read: false,
      priority: "medium",
      icon: IndianRupee,
      action: "View Earnings"
    },
    {
      id: "NOT-003",
      type: "alert",
      title: "Vehicle Maintenance Alert",
      message: "Your vehicle is due for routine service. Schedule maintenance to avoid penalties.",
      time: "1 hour ago",
      read: true,
      priority: "high",
      icon: AlertTriangle,
      action: "Schedule Service"
    },
    {
      id: "NOT-004",
      type: "rating",
      title: "Customer Rating Received",
      message: "Priya Sharma rated your service 5 stars with positive feedback",
      time: "2 hours ago",
      read: true,
      priority: "low",
      icon: Star,
      action: "View Review"
    },
    {
      id: "NOT-005",
      type: "delivery",
      title: "Delivery Completed",
      message: "Delivery DEL-154 to Amit Singh has been marked as completed",
      time: "3 hours ago",
      read: true,
      priority: "medium",
      icon: CheckCircle,
      action: "View Details"
    },
    {
      id: "NOT-006",
      type: "system",
      title: "Shift Schedule Updated",
      message: "Your shift for tomorrow (Jan 16) has been confirmed from 9:00 AM to 5:00 PM",
      time: "4 hours ago",
      read: true,
      priority: "medium",
      icon: Clock,
      action: "View Schedule"
    },
    {
      id: "NOT-007",
      type: "location",
      title: "Zone Assignment Changed",
      message: "You have been reassigned to North Delhi zone for better efficiency",
      time: "1 day ago",
      read: true,
      priority: "low",
      icon: MapPin,
      action: "View Zone"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "delivery": return "bg-primary text-primary-foreground";
      case "payment": return "bg-accent text-accent-foreground";
      case "alert": return "bg-destructive text-destructive-foreground";
      case "rating": return "bg-yellow-500 text-white";
      case "system": return "bg-secondary text-secondary-foreground";
      case "location": return "bg-blue-500 text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-l-destructive";
      case "medium": return "border-l-secondary";
      case "low": return "border-l-muted";
      default: return "border-l-muted";
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === "unread") return !notification.read;
    if (filter === "high") return notification.priority === "high";
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DashboardLayout userRole="driver">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-fuel-gradient rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Notifications</h1>
              <p className="text-white/90">Stay updated with your deliveries and alerts</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{unreadCount}</div>
              <p className="text-sm text-white/80">Unread</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between">
          <Tabs value={filter} onValueChange={setFilter} className="w-auto">
            <TabsList>
              <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
              <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
              <TabsTrigger value="high">High Priority</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Mail className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.map((notification) => {
            const IconComponent = notification.icon;
            return (
              <Card 
                key={notification.id} 
                className={`${!notification.read ? 'bg-muted/30' : ''} border-l-4 ${getPriorityColor(notification.priority)} hover:shadow-medium transition-shadow`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getTypeColor(notification.type)}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-semibold ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-muted-foreground">
                            {notification.time}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {notification.type}
                          </Badge>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              notification.priority === 'high' ? 'border-destructive text-destructive' :
                              notification.priority === 'medium' ? 'border-secondary text-secondary' :
                              'border-muted text-muted-foreground'
                            }`}
                          >
                            {notification.priority} priority
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      {notification.action && (
                        <Button variant="outline" size="sm">
                          {notification.action}
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Notifications</h3>
              <p className="text-muted-foreground">
                {filter === "unread" 
                  ? "You're all caught up! No unread notifications." 
                  : "You don't have any notifications yet."}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Delivery Notifications</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">New delivery assignments</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Delivery updates</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Route optimization alerts</span>
                  </label>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">System Notifications</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Payment confirmations</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Vehicle maintenance alerts</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Performance updates</span>
                  </label>
                </div>
              </div>
            </div>
            
            <Button className="mt-6">
              Save Preferences
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DriverNotifications;