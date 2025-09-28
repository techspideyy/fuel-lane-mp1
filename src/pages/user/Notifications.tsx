import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Bell, 
  MessageCircle, 
  Package, 
  CreditCard, 
  Star,
  Settings,
  CheckCircle,
  X,
  Fuel,
  Wrench,
  Trash2
} from "lucide-react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "order",
      title: "Fuel delivery completed",
      message: "Your Premium Petrol (50L) has been delivered successfully to Marine Drive",
      time: "2 minutes ago",
      read: false,
      icon: Fuel,
      color: "bg-accent"
    },
    {
      id: 2,
      type: "payment",
      title: "Payment received",
      message: "Payment of ₹6,077 for order #FO-2024-001 has been processed",
      time: "15 minutes ago",
      read: false,
      icon: CreditCard,
      color: "bg-primary"
    },
    {
      id: 3,
      type: "service",
      title: "Oil change reminder",
      message: "Your Honda Civic is due for oil change service. Book now for 20% discount",
      time: "2 hours ago",
      read: true,
      icon: Wrench,
      color: "bg-secondary"
    },
    {
      id: 4,
      type: "promo",
      title: "Special offer available",
      message: "Get 15% off on next fuel delivery. Use code FUEL15. Valid till tomorrow",
      time: "1 day ago",
      read: true,
      icon: Package,
      color: "bg-yellow-500"
    },
    {
      id: 5,
      type: "rating",
      title: "Rate your experience",
      message: "How was your recent service experience? Your feedback helps us improve",
      time: "2 days ago",
      read: true,
      icon: Star,
      color: "bg-yellow-500"
    }
  ]);

  const [settings, setSettings] = useState({
    orderUpdates: true,
    paymentAlerts: true,
    promotions: true,
    serviceReminders: true,
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false
  });

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const updateSetting = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <DashboardLayout userRole="user">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-fuel-gradient rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Notifications</h1>
              <p className="text-white/90">Stay updated with your orders and services</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{unreadCount}</div>
              <div className="text-sm text-white/80">Unread</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notifications List */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Recent Notifications
                  </CardTitle>
                  <div className="flex gap-2">
                    {unreadCount > 0 && (
                      <Button variant="outline" size="sm" onClick={markAllRead}>
                        Mark all read
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={clearAll}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear all
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {notifications.length === 0 ? (
                  <div className="text-center py-12">
                    <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">No notifications</h3>
                    <p className="text-muted-foreground">You're all caught up! New notifications will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border rounded-lg transition-all hover:shadow-sm ${
                          notification.read ? 'bg-background' : 'bg-muted/30 border-primary/20'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 ${notification.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                            <notification.icon className="w-5 h-5 text-white" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium text-sm">{notification.title}</h4>
                              <div className="flex items-center gap-2">
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-primary rounded-full" />
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteNotification(notification.id)}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">{notification.time}</span>
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Mark read
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Notification Settings */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4">Notification Types</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="order-updates" className="text-sm font-medium">
                          Order Updates
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Delivery status and tracking updates
                        </p>
                      </div>
                      <Switch
                        id="order-updates"
                        checked={settings.orderUpdates}
                        onCheckedChange={(checked) => updateSetting('orderUpdates', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="payment-alerts" className="text-sm font-medium">
                          Payment Alerts
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Payment confirmations and receipts
                        </p>
                      </div>
                      <Switch
                        id="payment-alerts"
                        checked={settings.paymentAlerts}
                        onCheckedChange={(checked) => updateSetting('paymentAlerts', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="promotions" className="text-sm font-medium">
                          Promotions
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Special offers and discounts
                        </p>
                      </div>
                      <Switch
                        id="promotions"
                        checked={settings.promotions}
                        onCheckedChange={(checked) => updateSetting('promotions', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="service-reminders" className="text-sm font-medium">
                          Service Reminders
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Vehicle maintenance reminders
                        </p>
                      </div>
                      <Switch
                        id="service-reminders"
                        checked={settings.serviceReminders}
                        onCheckedChange={(checked) => updateSetting('serviceReminders', checked)}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Delivery Methods</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push-notifications" className="text-sm font-medium">
                          Push Notifications
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          In-app notifications
                        </p>
                      </div>
                      <Switch
                        id="push-notifications"
                        checked={settings.pushNotifications}
                        onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-notifications" className="text-sm font-medium">
                          Email Notifications
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Email alerts and updates
                        </p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sms-notifications" className="text-sm font-medium">
                          SMS Notifications
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Text message alerts
                        </p>
                      </div>
                      <Switch
                        id="sms-notifications"
                        checked={settings.smsNotifications}
                        onCheckedChange={(checked) => updateSetting('smsNotifications', checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Notification Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{unreadCount}</div>
                    <div className="text-xs text-muted-foreground">Unread</div>
                  </div>
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <div className="text-2xl font-bold text-accent">{notifications.length}</div>
                    <div className="text-xs text-muted-foreground">Total</div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span>Order notifications enabled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Payment alerts enabled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-secondary rounded-full" />
                    <span>Promotions enabled</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;