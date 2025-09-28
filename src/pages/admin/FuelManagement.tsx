import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Fuel, 
  TrendingUp, 
  TrendingDown,
  IndianRupee,
  Edit3,
  Save,
  RefreshCw,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Plus,
  Settings,
  Calendar
} from "lucide-react";

const FuelPricing = () => {
  const fuelTypes = [
    {
      id: "regular",
      name: "Regular Gasoline",
      marketPrice: 289.50,
      ourPrice: 301.50,
      margin: 12.00,
      marginPercent: 4.06,
      volume: 1250,
      trend: "up",
      change: 0.05,
      lastUpdate: "2 hours ago"
    },
    {
      id: "premium",
      name: "Premium Gasoline", 
      marketPrice: 323.40,
      ourPrice: 337.68,
      margin: 14.28,
      marginPercent: 4.42,
      volume: 680,
      trend: "up",
      change: 0.03,
      lastUpdate: "2 hours ago"
    },
    {
      id: "diesel",
      name: "Diesel",
      marketPrice: 331.80,
      ourPrice: 346.08,
      margin: 14.28,
      marginPercent: 4.30,
      volume: 420,
      trend: "down",
      change: -0.02,
      lastUpdate: "1 hour ago"
    },
    {
      id: "electric",
      name: "Electric Charging",
      marketPrice: 23.52,
      ourPrice: 29.40,
      margin: 5.88,
      marginPercent: 25.0,
      volume: 180,
      trend: "stable",
      change: 0.00,
      lastUpdate: "3 hours ago",
      unit: "per kWh"
    }
  ];

  const regions = [
    {
      name: "Downtown",
      regularPrice: 301.56,
      premiumPrice: 337.68,
      dieselPrice: 346.08,
      competition: 295.68,
      volume: 850,
      status: "competitive"
    },
    {
      name: "Airport",
      regularPrice: 309.96,
      premiumPrice: 346.08,
      dieselPrice: 354.48,
      competition: 306.60,
      volume: 620,
      status: "premium"
    },
    {
      name: "Suburban",
      regularPrice: 293.16,
      premiumPrice: 329.28,
      dieselPrice: 337.68,
      competition: 291.48,
      volume: 480,
      status: "competitive"
    },
    {
      name: "Industrial",
      regularPrice: 297.36,
      premiumPrice: 333.48,
      dieselPrice: 341.88,
      competition: 294.00,
      volume: 380,
      status: "competitive"
    }
  ];

  const pricingHistory = [
    { date: "Dec 19", regular: 301.56, premium: 337.68, diesel: 346.08 },
    { date: "Dec 18", regular: 297.36, premium: 335.16, diesel: 347.76 },
    { date: "Dec 17", regular: 295.68, premium: 332.64, diesel: 349.44 },
    { date: "Dec 16", regular: 292.32, premium: 329.28, diesel: 351.12 },
    { date: "Dec 15", regular: 294.84, premium: 330.96, diesel: 348.60 },
    { date: "Dec 14", regular: 290.64, premium: 326.76, diesel: 346.08 },
    { date: "Dec 13", regular: 288.12, premium: 324.24, diesel: 343.56 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "competitive": return "bg-accent text-accent-foreground";
      case "premium": return "bg-secondary text-secondary-foreground";
      case "low": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-accent" />;
      case "down": return <TrendingDown className="w-4 h-4 text-destructive" />;
      default: return <div className="w-4 h-4" />;
    }
  };

  const FuelCard = ({ fuel }: { fuel: any }) => (
    <Card className="hover:shadow-medium transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Fuel className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">{fuel.name}</h3>
              <p className="text-sm text-muted-foreground">Updated {fuel.lastUpdate}</p>
            </div>
          </div>
          {getTrendIcon(fuel.trend)}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Market Price</p>
            <p className="text-lg font-bold">₹{fuel.marketPrice}{fuel.unit ? " " + fuel.unit : "/L"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Our Price</p>
            <div className="flex items-center gap-2">
              <Input 
                value={fuel.ourPrice} 
                className="w-20 h-8 text-lg font-bold p-1 text-center"
              />
              <span className="text-sm text-muted-foreground">{fuel.unit ? fuel.unit : "/L"}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Margin:</span>
            <span className="font-medium">₹{fuel.margin} ({fuel.marginPercent}%)</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Daily Volume:</span>
            <span className="font-medium">{fuel.volume}{fuel.unit ? " kWh" : " L"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">24h Change:</span>
            <span className={`font-medium ${fuel.change >= 0 ? "text-accent" : "text-destructive"}`}>
              {fuel.change >= 0 ? "+" : ""}{fuel.change}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1">
            <Edit3 className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button size="sm" className="flex-1">
            <Save className="w-4 h-4 mr-1" />
            Update
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const RegionCard = ({ region }: { region: any }) => (
    <Card className="hover:shadow-medium transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h3 className="font-medium">{region.name}</h3>
              <Badge className={getStatusColor(region.status)}>
                {region.status}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4 text-center">
          <div>
            <p className="text-xs text-muted-foreground">Regular</p>
            <p className="font-bold">₹{region.regularPrice}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Premium</p>
            <p className="font-bold">₹{region.premiumPrice}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Diesel</p>
            <p className="font-bold">₹{region.dieselPrice}</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Competition:</span>
            <span className="font-medium">₹{region.competition}/L</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Daily Volume:</span>
            <span className="font-medium">{region.volume} L</span>
          </div>
        </div>

        <Button size="sm" variant="outline" className="w-full">
          <Settings className="w-4 h-4 mr-2" />
          Adjust Pricing
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Fuel Pricing Management</h1>
            <p className="text-muted-foreground">Monitor and adjust fuel prices across all locations</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Prices
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Fuel Type
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Margin</p>
                  <p className="text-2xl font-bold">4.2%</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <IndianRupee className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Daily Volume</p>
                  <p className="text-2xl font-bold">2,530</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Fuel className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Revenue Today</p>
                  <p className="text-2xl font-bold">₹7,63,140</p>
                </div>
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Price Updates</p>
                  <p className="text-2xl font-bold">
                    <CheckCircle className="w-6 h-6 text-accent inline" />
                  </p>
                </div>
                <div className="w-12 h-12 bg-muted/10 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Tabs */}
        <Tabs defaultValue="current" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="current">Current Prices</TabsTrigger>
            <TabsTrigger value="regions">By Region</TabsTrigger>
            <TabsTrigger value="history">Price History</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {fuelTypes.map((fuel) => (
                <FuelCard key={fuel.id} fuel={fuel} />
              ))}
            </div>

            {/* Bulk Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Bulk Price Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Adjust all prices by:</span>
                    <Input className="w-20" placeholder="4.20" />
                    <span className="text-sm">per liter</span>
                  </div>
                  <Button>Apply to All</Button>
                  <Button variant="outline">Apply to Regular Only</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="regions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {regions.map((region, index) => (
                <RegionCard key={index} region={region} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Price History (Last 7 Days)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pricingHistory.map((day, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium">{day.date}</span>
                      </div>
                      <div className="flex gap-6 text-sm">
                        <div className="text-center">
                          <p className="text-muted-foreground">Regular</p>
                          <p className="font-bold">₹{day.regular}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-muted-foreground">Premium</p>
                          <p className="font-bold">₹{day.premium}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-muted-foreground">Diesel</p>
                          <p className="font-bold">₹{day.diesel}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-secondary" />
                    Price Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border border-secondary rounded-lg">
                      <div>
                        <p className="font-medium">Regular gas margin below 4%</p>
                        <p className="text-sm text-muted-foreground">Current margin: 3.8% in Downtown</p>
                      </div>
                      <Badge className="bg-secondary text-secondary-foreground">Warning</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-destructive rounded-lg">
                      <div>
                        <p className="font-medium">Competitor price drop detected</p>
                        <p className="text-sm text-muted-foreground">Shell lowered regular to ₹287.28 nearby</p>
                      </div>
                      <Badge className="bg-destructive text-destructive-foreground">Critical</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alert Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Margin below 3%</span>
                      <Button size="sm" variant="outline">Enabled</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Competitor price changes</span>
                      <Button size="sm" variant="outline">Enabled</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Market price volatility</span>
                      <Button size="sm" variant="outline">Disabled</Button>
                    </div>
                    <Button className="w-full mt-4">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure Alerts
                    </Button>
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

export default FuelPricing;