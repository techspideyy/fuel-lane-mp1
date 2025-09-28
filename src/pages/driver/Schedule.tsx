import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin,
  Truck,
  CheckCircle,
  XCircle,
  Plus,
  Edit3,
  BarChart3
} from "lucide-react";
import { format } from "date-fns";

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const shifts = [
    {
      id: "SHIFT-001",
      date: "2024-01-15",
      startTime: "08:00",
      endTime: "16:00",
      zone: "North Delhi",
      status: "confirmed",
      expectedDeliveries: 12,
      estimatedEarnings: "₹1,800"
    },
    {
      id: "SHIFT-002", 
      date: "2024-01-16",
      startTime: "09:00",
      endTime: "17:00",
      zone: "Gurgaon",
      status: "confirmed",
      expectedDeliveries: 15,
      estimatedEarnings: "₹2,250"
    },
    {
      id: "SHIFT-003",
      date: "2024-01-17",
      startTime: "07:00",
      endTime: "15:00", 
      zone: "Noida",
      status: "pending",
      expectedDeliveries: 10,
      estimatedEarnings: "₹1,500"
    }
  ];

  const weeklyStats = {
    totalHours: 56,
    scheduledShifts: 7,
    completedShifts: 5,
    estimatedEarnings: "₹12,600"
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-accent text-accent-foreground";
      case "pending": return "bg-secondary text-secondary-foreground";
      case "cancelled": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed": return <CheckCircle className="w-4 h-4" />;
      case "pending": return <Clock className="w-4 h-4" />;
      case "cancelled": return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <DashboardLayout userRole="driver">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-fuel-gradient rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Work Schedule</h1>
              <p className="text-white/90">Manage your shifts and track your work hours</p>
            </div>
            <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30">
              <Plus className="w-4 h-4 mr-2" />
              Request Shift
            </Button>
          </div>
        </div>

        {/* Weekly Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Hours</p>
                  <p className="text-2xl font-bold">{weeklyStats.totalHours}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Scheduled Shifts</p>
                  <p className="text-2xl font-bold">{weeklyStats.scheduledShifts}</p>
                </div>
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <CalendarIcon className="w-6 h-6 text-secondary" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">7 days ahead</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">{weeklyStats.completedShifts}</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-accent" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Est. Earnings</p>
                  <p className="text-2xl font-bold">{weeklyStats.estimatedEarnings}</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-accent" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">This week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                Calendar View
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border w-full"
              />
              
              <div className="mt-6 space-y-2">
                <h4 className="font-medium">Legend</h4>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span>Confirmed Shift</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-secondary rounded-full"></div>
                  <span>Pending Shift</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-muted rounded-full"></div>
                  <span>Available</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Shifts */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Upcoming Shifts
                  </span>
                  <Button variant="outline" size="sm">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Modify Schedule
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {shifts.map((shift) => (
                    <div key={shift.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-medium">{format(new Date(shift.date), "EEEE, MMM dd")}</p>
                          <p className="text-sm text-muted-foreground">{shift.id}</p>
                        </div>
                        <Badge className={getStatusColor(shift.status)}>
                          {getStatusIcon(shift.status)}
                          <span className="ml-1 capitalize">{shift.status}</span>
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span>{shift.startTime} - {shift.endTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span>{shift.zone}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Truck className="w-4 h-4 text-muted-foreground" />
                            <span>{shift.expectedDeliveries} deliveries</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-muted-foreground" />
                            <span>{shift.estimatedEarnings}</span>
                          </div>
                        </div>
                      </div>

                      {shift.status === "pending" && (
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline" className="flex-1">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Accept
                          </Button>
                          <Button size="sm" variant="destructive" className="flex-1">
                            <XCircle className="w-4 h-4 mr-2" />
                            Decline
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {shifts.length === 0 && (
                  <div className="text-center py-8">
                    <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">No upcoming shifts scheduled</p>
                    <Button className="mt-4" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Request a Shift
                    </Button>
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

export default Schedule;