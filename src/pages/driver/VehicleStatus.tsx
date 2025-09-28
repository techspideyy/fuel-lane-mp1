import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Truck, 
  Fuel, 
  Gauge,
  Wrench,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Settings,
  Calendar,
  MapPin,
  Clock,
  Activity,
  TrendingUp,
  FileText
} from "lucide-react";

const VehicleStatus = () => {
  const vehicleInfo = {
    model: "Tata Ace Gold",
    plateNumber: "DL 8C AB 1234",
    capacity: "500L",
    currentLoad: "320L",
    fuelLevel: 75,
    mileage: "45,682 km",
    lastService: "2024-01-10",
    nextService: "2024-04-10"
  };

  const systemStatus = {
    engine: { status: "good", lastCheck: "2024-01-15", icon: CheckCircle, color: "text-accent" },
    brakes: { status: "warning", lastCheck: "2024-01-12", icon: AlertTriangle, color: "text-secondary" },
    tires: { status: "good", lastCheck: "2024-01-14", icon: CheckCircle, color: "text-accent" },
    fuelPump: { status: "good", lastCheck: "2024-01-15", icon: CheckCircle, color: "text-accent" },
    transmission: { status: "good", lastCheck: "2024-01-13", icon: CheckCircle, color: "text-accent" },
    electrical: { status: "critical", lastCheck: "2024-01-11", icon: XCircle, color: "text-destructive" }
  };

  const maintenanceHistory = [
    {
      id: "MNT-001",
      date: "2024-01-10",
      type: "Routine Service",
      description: "Oil change, filter replacement",
      cost: "₹2,500",
      status: "completed"
    },
    {
      id: "MNT-002",
      date: "2024-01-05",
      type: "Brake Inspection",
      description: "Brake pad check and adjustment",
      cost: "₹800",
      status: "completed"
    },
    {
      id: "MNT-003",
      date: "2023-12-28",
      type: "Tire Rotation",
      description: "Tire rotation and pressure check",
      cost: "₹500",
      status: "completed"
    }
  ];

  const performanceMetrics = {
    fuelEfficiency: 18.5,
    avgSpeed: 28,
    totalDeliveries: 245,
    uptime: 95.8
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "good": return <Badge className="bg-accent text-accent-foreground">Good</Badge>;
      case "warning": return <Badge className="bg-secondary text-secondary-foreground">Warning</Badge>;
      case "critical": return <Badge className="bg-destructive text-destructive-foreground">Critical</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <DashboardLayout userRole="driver">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-fuel-gradient rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Vehicle Status</h1>
              <p className="text-white/90">Monitor your vehicle health and performance</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/80">Vehicle ID</p>
              <p className="text-xl font-bold">{vehicleInfo.plateNumber}</p>
            </div>
          </div>
        </div>

        {/* Vehicle Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Fuel Level</p>
                  <p className="text-2xl font-bold">{vehicleInfo.fuelLevel}%</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Fuel className="w-6 h-6 text-primary" />
                </div>
              </div>
              <Progress value={vehicleInfo.fuelLevel} className="mt-3" />
              <p className="text-xs text-muted-foreground mt-2">~180 km range</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Cargo Load</p>
                  <p className="text-2xl font-bold">{vehicleInfo.currentLoad}</p>
                </div>
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6 text-secondary" />
                </div>
              </div>
              <Progress value={(320/500) * 100} className="mt-3" />
              <p className="text-xs text-muted-foreground mt-2">180L available</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Mileage</p>
                  <p className="text-2xl font-bold">{vehicleInfo.mileage}</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Gauge className="w-6 h-6 text-accent" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Service due in 5,318 km</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Vehicle Health</p>
                  <p className="text-2xl font-bold">Good</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-accent" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">2 items need attention</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(systemStatus).map(([system, info]) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={system} className="p-3 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium capitalize">{system}</span>
                        <IconComponent className={`w-4 h-4 ${info.color}`} />
                      </div>
                      {getStatusBadge(info.status)}
                      <p className="text-xs text-muted-foreground mt-1">
                        Last check: {info.lastCheck}
                      </p>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 space-y-2">
                <Button className="w-full">
                  <Wrench className="w-4 h-4 mr-2" />
                  Schedule Maintenance
                </Button>
                <Button variant="outline" className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  View Diagnostic Report
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{performanceMetrics.fuelEfficiency}</div>
                    <div className="text-sm text-muted-foreground">km/L</div>
                    <div className="text-xs text-muted-foreground">Fuel Efficiency</div>
                  </div>
                  
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-secondary">{performanceMetrics.avgSpeed}</div>
                    <div className="text-sm text-muted-foreground">km/h</div>
                    <div className="text-xs text-muted-foreground">Avg Speed</div>
                  </div>
                  
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-accent">{performanceMetrics.totalDeliveries}</div>
                    <div className="text-sm text-muted-foreground">Total</div>
                    <div className="text-xs text-muted-foreground">Deliveries</div>
                  </div>
                  
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-accent">{performanceMetrics.uptime}%</div>
                    <div className="text-sm text-muted-foreground">Uptime</div>
                    <div className="text-xs text-muted-foreground">This Month</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Engine Efficiency</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Delivery Performance</span>
                      <span>87%</span>
                    </div>
                    <Progress value={87} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Vehicle Utilization</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Maintenance History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Maintenance History
              </span>
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {maintenanceHistory.map((maintenance) => (
                <div key={maintenance.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">{maintenance.type}</p>
                      <p className="text-sm text-muted-foreground">{maintenance.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{maintenance.cost}</p>
                      <p className="text-sm text-muted-foreground">{maintenance.date}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{maintenance.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <Badge className="bg-accent text-accent-foreground">Completed</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default VehicleStatus;