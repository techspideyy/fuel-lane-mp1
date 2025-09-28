import { HomeIcon, Package, Wrench, Truck, BarChart3, Settings, HelpCircle, Star, CreditCard, Bell, Car, Calendar, Users, Fuel, UserCheck, LifeBuoy, Activity } from "lucide-react";
import { Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import RoleProtectedRoute from "./components/auth/RoleProtectedRoute";

// Auth pages
import Auth from "./pages/auth/Auth";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// User pages
import UserDashboard from "./pages/dashboards/UserDashboard";
import FuelOrder from "./pages/user/FuelOrder";
import GarageService from "./pages/user/GarageService";
import OrderTracking from "./pages/user/OrderTracking";
import PaymentPage from "./pages/user/PaymentPage";
import Reviews from "./pages/user/Reviews";
import Notifications from "./pages/user/Notifications";
import UserSettings from "./pages/user/Settings";
import Support from "./pages/user/Support";

// Driver pages
import DriverDashboard from "./pages/dashboards/DriverDashboard";
import ActiveDeliveries from "./pages/driver/ActiveDeliveries";
import Schedule from "./pages/driver/Schedule";
import Earnings from "./pages/driver/Earnings";
import VehicleStatus from "./pages/driver/VehicleStatus";
import DriverSettings from "./pages/driver/DriverSettings";
import DriverNotifications from "./pages/driver/DriverNotifications";

// Mechanic pages
import MechanicDashboard from "./pages/dashboards/MechanicDashboard";
import AppointmentManagement from "./pages/mechanic/AppointmentManagement";
import MechanicServiceManagement from "./pages/mechanic/ServiceManagement";
import CustomerManagement from "./pages/mechanic/CustomerManagement";
import InventoryManagement from "./pages/mechanic/InventoryManagement";

// Admin pages
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import FuelManagement from "./pages/admin/FuelManagement";
import AdminServiceManagement from "./pages/admin/ServiceManagement";
import PaymentManagement from "./pages/admin/PaymentManagement";
import Analytics from "./pages/admin/Analytics";
import SupportManagement from "./pages/admin/SupportManagement";
import AdminSettings from "./pages/admin/AdminSettings";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Landing />,
  },
  
  // Auth routes
  {
    title: "Auth",
    to: "/auth",
    icon: <UserCheck className="h-4 w-4" />,
    page: <Auth />,
  },
  {
    title: "Login",
    to: "/auth/login",
    icon: <UserCheck className="h-4 w-4" />,
    page: <Login />,
  },
  {
    title: "Register",
    to: "/auth/register",
    icon: <UserCheck className="h-4 w-4" />,
    page: <Register />,
  },
  
  // User Dashboard and Features
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: <BarChart3 className="h-4 w-4" />,
    page: <Navigate to="/dashboard/user" replace />,
  },
  {
    title: "User Dashboard",
    to: "/dashboard/user",
    icon: <BarChart3 className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['user']}><UserDashboard /></RoleProtectedRoute>,
  },
  {
    title: "Order Fuel",
    to: "/fuel-order",
    icon: <Fuel className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['user']}><FuelOrder /></RoleProtectedRoute>,
  },
  {
    title: "Order Fuel",
    to: "/dashboard/user/fuel",
    icon: <Fuel className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['user']}><FuelOrder /></RoleProtectedRoute>,
  },
  {
    title: "Garage Service",
    to: "/dashboard/user/garage",
    icon: <Wrench className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['user']}><GarageService /></RoleProtectedRoute>,
  },
  {
    title: "Track Orders",
    to: "/dashboard/user/tracking",
    icon: <Package className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['user']}><OrderTracking /></RoleProtectedRoute>,
  },
  {
    title: "Payments",
    to: "/dashboard/user/payments",
    icon: <CreditCard className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['user']}><PaymentPage /></RoleProtectedRoute>,
  },
  {
    title: "User Notifications",
    to: "/dashboard/user/notifications",
    icon: <Bell className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['user']}><Notifications /></RoleProtectedRoute>,
  },
  {
    title: "Reviews",
    to: "/dashboard/user/reviews",
    icon: <Star className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['user']}><Reviews /></RoleProtectedRoute>,
  },
  {
    title: "User Settings",
    to: "/dashboard/user/settings",
    icon: <Settings className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['user']}><UserSettings /></RoleProtectedRoute>,
  },
  {
    title: "Garage Service",
    to: "/garage-service",
    icon: <Wrench className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['user']}><GarageService /></RoleProtectedRoute>,
  },
  {
    title: "Track Order",
    to: "/order-tracking",
    icon: <Package className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['user']}><OrderTracking /></RoleProtectedRoute>,
  },
  {
    title: "Payment",
    to: "/payment",
    icon: <CreditCard className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['user']}><PaymentPage /></RoleProtectedRoute>,
  },
  {
    title: "Reviews",
    to: "/reviews",
    icon: <Star className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['user']}><Reviews /></RoleProtectedRoute>,
  },
  {
    title: "Notifications",
    to: "/notifications",
    icon: <Bell className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['user']}><Notifications /></RoleProtectedRoute>,
  },
  {
    title: "Settings",
    to: "/settings",
    icon: <Settings className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['user']}><UserSettings /></RoleProtectedRoute>,
  },
  {
    title: "Support",
    to: "/support",
    icon: <HelpCircle className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['user']}><Support /></RoleProtectedRoute>,
  },

  // Driver Dashboard and Features
  {
    title: "Driver Dashboard",
    to: "/driver-dashboard",
    icon: <Truck className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['driver']}><DriverDashboard /></RoleProtectedRoute>,
  },
  {
    title: "Driver Dashboard",
    to: "/dashboard/driver",
    icon: <Truck className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['driver']}><DriverDashboard /></RoleProtectedRoute>,
  },
  {
    title: "Active Deliveries",
    to: "/active-deliveries",
    icon: <Activity className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['driver']}><ActiveDeliveries /></RoleProtectedRoute>,
  },
  {
    title: "Active Deliveries",
    to: "/dashboard/driver/deliveries",
    icon: <Activity className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['driver']}><ActiveDeliveries /></RoleProtectedRoute>,
  },
  {
    title: "Driver Schedule",
    to: "/dashboard/driver/schedule",
    icon: <Calendar className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['driver']}><Schedule /></RoleProtectedRoute>,
  },
  {
    title: "Driver Vehicle",
    to: "/dashboard/driver/vehicle",
    icon: <Car className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['driver']}><VehicleStatus /></RoleProtectedRoute>,
  },
  {
    title: "Driver Earnings",
    to: "/dashboard/driver/earnings",
    icon: <CreditCard className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['driver']}><Earnings /></RoleProtectedRoute>,
  },
  {
    title: "Driver Notifications",
    to: "/dashboard/driver/notifications",
    icon: <Bell className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['driver']}><DriverNotifications /></RoleProtectedRoute>,
  },
  {
    title: "Driver Settings",
    to: "/dashboard/driver/settings",
    icon: <Settings className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['driver']}><DriverSettings /></RoleProtectedRoute>,
  },
  {
    title: "Schedule",
    to: "/schedule",
    icon: <Calendar className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['driver']}><Schedule /></RoleProtectedRoute>,
  },
  {
    title: "Earnings",
    to: "/earnings",
    icon: <CreditCard className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['driver']}><Earnings /></RoleProtectedRoute>,
  },
  {
    title: "Vehicle Status",
    to: "/vehicle-status",
    icon: <Car className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['driver']}><VehicleStatus /></RoleProtectedRoute>,
  },
  {
    title: "Driver Settings",
    to: "/driver-settings",
    icon: <Settings className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['driver']}><DriverSettings /></RoleProtectedRoute>,
  },
  {
    title: "Driver Notifications",
    to: "/driver-notifications",
    icon: <Bell className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['driver']}><DriverNotifications /></RoleProtectedRoute>,
  },

  // Mechanic Dashboard and Features
  {
    title: "Mechanic Dashboard",
    to: "/mechanic-dashboard",
    icon: <Wrench className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['mechanic']}><MechanicDashboard /></RoleProtectedRoute>,
  },
  {
    title: "Mechanic Dashboard",
    to: "/dashboard/mechanic",
    icon: <Wrench className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['mechanic']}><MechanicDashboard /></RoleProtectedRoute>,
  },
  {
    title: "Mechanic Appointments",
    to: "/dashboard/mechanic/appointments",
    icon: <Calendar className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['mechanic']}><AppointmentManagement /></RoleProtectedRoute>,
  },
  {
    title: "Mechanic Services",
    to: "/dashboard/mechanic/services",
    icon: <Wrench className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['mechanic']}><MechanicServiceManagement /></RoleProtectedRoute>,
  },
  {
    title: "Mechanic Inventory",
    to: "/dashboard/mechanic/inventory",
    icon: <Package className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['mechanic']}><InventoryManagement /></RoleProtectedRoute>,
  },
  {
    title: "Mechanic Customers",
    to: "/dashboard/mechanic/customers",
    icon: <Users className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['mechanic']}><CustomerManagement /></RoleProtectedRoute>,
  },
  {
    title: "Appointments",
    to: "/appointments",
    icon: <Calendar className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['mechanic']}><AppointmentManagement /></RoleProtectedRoute>,
  },
  {
    title: "Service Management",
    to: "/service-management",
    icon: <Wrench className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['mechanic']}><MechanicServiceManagement /></RoleProtectedRoute>,
  },
  {
    title: "Customer Management",
    to: "/customer-management",
    icon: <Users className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['mechanic']}><CustomerManagement /></RoleProtectedRoute>,
  },
  {
    title: "Inventory",
    to: "/inventory",
    icon: <Package className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['mechanic']}><InventoryManagement /></RoleProtectedRoute>,
  },

  // Admin Dashboard and Features
  {
    title: "Admin Dashboard",
    to: "/admin-dashboard",
    icon: <BarChart3 className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['admin']}><AdminDashboard /></RoleProtectedRoute>,
  },
  {
    title: "Admin Dashboard",
    to: "/dashboard/admin",
    icon: <BarChart3 className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['admin']}><AdminDashboard /></RoleProtectedRoute>,
  },
  {
    title: "Admin Users",
    to: "/dashboard/admin/users",
    icon: <Users className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['admin']}><UserManagement /></RoleProtectedRoute>,
  },
  {
    title: "Admin Fuel",
    to: "/dashboard/admin/fuel",
    icon: <Fuel className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['admin']}><FuelManagement /></RoleProtectedRoute>,
  },
  {
    title: "Admin Services",
    to: "/dashboard/admin/services",
    icon: <Wrench className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['admin']}><AdminServiceManagement /></RoleProtectedRoute>,
  },
  {
    title: "Admin Analytics",
    to: "/dashboard/admin/analytics",
    icon: <BarChart3 className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['admin']}><Analytics /></RoleProtectedRoute>,
  },
  {
    title: "Admin Payments",
    to: "/dashboard/admin/payments",
    icon: <CreditCard className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['admin']}><PaymentManagement /></RoleProtectedRoute>,
  },
  {
    title: "Admin Support",
    to: "/dashboard/admin/support",
    icon: <LifeBuoy className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['admin']}><SupportManagement /></RoleProtectedRoute>,
  },
  {
    title: "Admin Settings",
    to: "/dashboard/admin/settings",
    icon: <Settings className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['admin']}><AdminSettings /></RoleProtectedRoute>,
  },
  {
    title: "User Management",
    to: "/user-management",
    icon: <Users className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['admin']}><UserManagement /></RoleProtectedRoute>,
  },
  {
    title: "Fuel Management",
    to: "/fuel-management",
    icon: <Fuel className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['admin']}><FuelManagement /></RoleProtectedRoute>,
  },
  {
    title: "Admin Service Management",
    to: "/admin-service-management",
    icon: <Wrench className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['admin']}><AdminServiceManagement /></RoleProtectedRoute>,
  },
  {
    title: "Payment Management",
    to: "/payment-management",
    icon: <CreditCard className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['admin']}><PaymentManagement /></RoleProtectedRoute>,
  },
  {
    title: "Analytics",
    to: "/analytics",
    icon: <BarChart3 className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['admin']}><Analytics /></RoleProtectedRoute>,
  },
  {
    title: "Support Management",
    to: "/support-management",
    icon: <LifeBuoy className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['admin']}><SupportManagement /></RoleProtectedRoute>,
  },
  {
    title: "Admin Settings",
    to: "/admin-settings",
    icon: <Settings className="h-4 w-4" />,
    page: <RoleProtectedRoute allowedRoles={['admin']}><AdminSettings /></RoleProtectedRoute>,
  },

  // Catch-all route
  {
    title: "Not Found",
    to: "*",
    icon: <HelpCircle className="h-4 w-4" />,
    page: <NotFound />,
  },
];