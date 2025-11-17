import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Fuel, Wrench, Truck, Shield, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Landing = () => {
  const { user, profile } = useAuth();
  
  const getDashboardPath = (role: string) => {
    if (user && profile) {
      // If user is logged in, redirect to their actual dashboard
      const dashboardRoutes = {
        user: '/dashboard/user',
        driver: '/dashboard/driver',
        mechanic: '/dashboard/mechanic',
        admin: '/dashboard/admin'
      };
      return dashboardRoutes[profile.role as keyof typeof dashboardRoutes] || '/dashboard/user';
    }
    // If not logged in, show the role-specific dashboard path
    const rolePaths = {
      user: '/dashboard',
      driver: '/driver-dashboard',
      mechanic: '/mechanic-dashboard',
      admin: '/admin-dashboard'
    };
    return rolePaths[role as keyof typeof rolePaths] || '/dashboard';
  };

  const roles = [
    {
      title: "Customer",
      description: "Order fuel delivery & book garage services",
      icon: Fuel,
      path: getDashboardPath('user'),
      gradient: "bg-fuel-gradient"
    },
    {
      title: "Driver",
      description: "Deliver fuel & manage your routes",
      icon: Truck,
      path: getDashboardPath('driver'),
      gradient: "bg-secondary"
    },
    {
      title: "Mechanic",
      description: "Provide garage services & manage appointments",
      icon: Wrench,
      path: getDashboardPath('mechanic'),
      gradient: "bg-accent"
    },
    {
      title: "Admin",
      description: "Manage platform & monitor operations",
      icon: Shield,
      path: getDashboardPath('admin'),
      gradient: "bg-primary"
    }
  ];

  const features = [
    {
      icon: MapPin,
      title: "Location-Based Service",
      description: "Precise delivery to your exact location with GPS tracking"
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Round-the-clock fuel delivery and emergency garage services"
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Multiple payment options with secure transaction processing"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-fuel-gradient text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Fuel Delivery & Garage Services
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 animate-slide-up">
            Professional fuel delivery and comprehensive automotive services at your doorstep
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/auth">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Role Selection */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Choose Your Role</h2>
            <p className="text-xl text-muted-foreground">Select how you want to use our platform</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {roles.map((role, index) => (
              <Card key={role.title} className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-2 animate-slide-up border-border/50" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 rounded-full ${role.gradient} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <role.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{role.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm">{role.description}</p>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                    <Link to={role.path}>Access Dashboard</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose Us</h2>
            <p className="text-xl text-muted-foreground">Professional, reliable, and convenient</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div key={feature.title} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="mb-6 opacity-90">Join thousands of satisfied customers</p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/auth">Create Account</Link>
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default Landing;