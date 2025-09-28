import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  IndianRupee, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Download,
  Target,
  Award,
  Clock,
  Truck,
  Star,
  BarChart3
} from "lucide-react";

const Earnings = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  const earningsData = {
    today: { amount: 1847, deliveries: 12, hours: 8, bonus: 200 },
    week: { amount: 12620, deliveries: 78, hours: 56, bonus: 1250 },
    month: { amount: 54830, deliveries: 342, hours: 248, bonus: 5200 }
  };

  const currentData = earningsData[selectedPeriod as keyof typeof earningsData];

  const recentEarnings = [
    {
      id: "DEL-156",
      date: "2024-01-15",
      time: "14:30",
      customer: "Rajesh Kumar",
      amount: 156,
      distance: "3.2 km",
      tip: 20,
      rating: 5
    },
    {
      id: "DEL-155",
      date: "2024-01-15",
      time: "13:15",
      customer: "Priya Sharma", 
      amount: 134,
      distance: "2.8 km",
      tip: 15,
      rating: 4
    },
    {
      id: "DEL-154",
      date: "2024-01-15",
      time: "12:00",
      customer: "Amit Singh",
      amount: 178,
      distance: "4.1 km",
      tip: 25,
      rating: 5
    },
    {
      id: "DEL-153",
      date: "2024-01-15",
      time: "10:45",
      customer: "Sneha Gupta",
      amount: 145,
      distance: "3.5 km",
      tip: 0,
      rating: 3
    }
  ];

  const bonuses = [
    {
      type: "Peak Hour Bonus",
      amount: 150,
      date: "2024-01-15",
      description: "Extra earnings during rush hours"
    },
    {
      type: "Customer Rating Bonus",
      amount: 100,
      date: "2024-01-14",
      description: "Maintaining 4.8+ star rating"
    },
    {
      type: "Delivery Streak Bonus",
      amount: 200,
      date: "2024-01-13",
      description: "15+ successful deliveries in a day"
    }
  ];

  const goals = [
    {
      title: "Daily Target",
      current: 1847,
      target: 2000,
      progress: 92.35,
      icon: Target
    },
    {
      title: "Weekly Goal",
      current: 12620,
      target: 15000,
      progress: 84.13,
      icon: TrendingUp
    },
    {
      title: "Rating Target",
      current: 4.8,
      target: 4.9,
      progress: 97.96,
      icon: Star
    }
  ];

  return (
    <DashboardLayout userRole="driver">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-fuel-gradient rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Earnings Dashboard</h1>
              <p className="text-white/90">Track your income and performance metrics</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/80">This Month</p>
              <p className="text-2xl font-bold">₹{earningsData.month.amount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Period Selector */}
        <div className="flex items-center justify-between">
          <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-auto">
            <TabsList>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="week">This Week</TabsTrigger>
              <TabsTrigger value="month">This Month</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Earnings Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                  <p className="text-2xl font-bold">₹{currentData.amount.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <IndianRupee className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-accent" />
                <span className="text-sm text-accent">+12.5%</span>
                <span className="text-xs text-muted-foreground">vs last {selectedPeriod}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Deliveries</p>
                  <p className="text-2xl font-bold">{currentData.deliveries}</p>
                </div>
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6 text-secondary" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-accent" />
                <span className="text-sm text-accent">+8.3%</span>
                <span className="text-xs text-muted-foreground">vs last {selectedPeriod}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Hours Worked</p>
                  <p className="text-2xl font-bold">{currentData.hours}h</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                ₹{Math.round(currentData.amount / currentData.hours)}/hour avg
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Bonuses</p>
                  <p className="text-2xl font-bold">₹{currentData.bonus}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-yellow-500" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {Math.round((currentData.bonus / currentData.amount) * 100)}% of total earnings
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Earnings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Recent Deliveries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentEarnings.map((earning) => (
                  <div key={earning.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium">{earning.customer}</p>
                        <p className="text-sm text-muted-foreground">{earning.id} • {earning.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">₹{earning.amount}</p>
                        {earning.tip > 0 && (
                          <p className="text-sm text-accent">+₹{earning.tip} tip</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{earning.distance}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{earning.rating}.0</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Goals & Bonuses */}
          <div className="space-y-6">
            {/* Performance Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Performance Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {goals.map((goal, index) => {
                    const IconComponent = goal.icon;
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <IconComponent className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{goal.title}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {goal.title.includes("Rating") ? goal.current : `₹${goal.current}`} / {goal.title.includes("Rating") ? goal.target : `₹${goal.target}`}
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${Math.min(goal.progress, 100)}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-muted-foreground">{goal.progress.toFixed(1)}% completed</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Bonuses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Recent Bonuses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {bonuses.map((bonus, index) => (
                    <div key={index} className="p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{bonus.type}</span>
                        <span className="font-bold text-accent">+₹{bonus.amount}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{bonus.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{bonus.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Earnings;