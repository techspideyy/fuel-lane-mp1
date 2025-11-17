// FINAL FIXED nav-items.ts

import {
  HomeIcon,
  UserCheck,
  Fuel,
  Wrench,
  Package,
  CreditCard,
  Bell,
  Star,
  Settings,
  HelpCircle,
  Truck,
  Calendar,
  Users,
  Car,
  Activity,
  BarChart3,
  LifeBuoy,
} from "lucide-react";

import Landing from "@/pages/Landing";
import NotFound from "@/pages/NotFound";

import Auth from "@/pages/auth/Auth";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

import RoleProtectedRoute from "@/components/auth/RoleProtectedRoute";

// USER
import UserDashboard from "@/pages/dashboards/UserDashboard";
import FuelOrder from "@/pages/user/FuelOrder";
import GarageService from "@/pages/user/GarageService";
import OrderTracking from "@/pages/user/OrderTracking";
import PaymentPage from "@/pages/user/PaymentPage";
import Reviews from "@/pages/user/Reviews";
import Notifications from "@/pages/user/Notifications";
import UserSettings from "@/pages/user/Settings";
import Support from "@/pages/user/Support";

// DRIVER
import DriverDashboard from "@/pages/dashboards/DriverDashboard";
import ActiveDeliveries from "@/pages/driver/ActiveDeliveries";
import DriverNotifications from "@/pages/driver/DriverNotifications";
import DriverSettings from "@/pages/driver/DriverSettings";
import Earnings from "@/pages/driver/Earnings";
import Schedule from "@/pages/driver/Schedule";
import VehicleStatus from "@/pages/driver/VehicleStatus";

// MECHANIC
import MechanicDashboard from "@/pages/dashboards/MechanicDashboard";
import AppointmentManagement from "@/pages/mechanic/AppointmentManagement";
import CustomerManagement from "@/pages/mechanic/CustomerManagement";
import MechanicInventoryManagement from "@/pages/mechanic/InventoryManagement";
import MechanicServiceManagement from "@/pages/mechanic/ServiceManagement";

// ADMIN
import AdminDashboard from "@/pages/dashboards/AdminDashboard";
import UserManagement from "@/pages/admin/UserManagement";
import SupportManagement from "@/pages/admin/SupportManagement";
import FuelManagement from "@/pages/admin/FuelManagement";
import PaymentManagement from "@/pages/admin/PaymentManagement";
import AdminInventoryManagement from "@/pages/admin/InventoryManagement";
import AdminServiceManagement from "@/pages/admin/ServiceManagement";
import Analytics from "@/pages/admin/Analytics";
import AdminSettings from "@/pages/admin/AdminSettings";

export const navItems = [

  // PUBLIC
  {
    group: "Public",
    items: [
      {
        title: "Home",
        path: "/",
        icon: <HomeIcon className="h-4 w-4" />,
        element: <Landing />,
      },
    ],
  },

  // AUTH
  {
    group: "Authentication",
    items: [
      {
        title: "Auth",
        path: "/auth",
        icon: <UserCheck className="h-4 w-4" />,
        element: <Auth />,
      },
      {
        title: "Login",
        path: "/auth/login",
        icon: <UserCheck className="h-4 w-4" />,
        element: <Login />,
      },
      {
        title: "Register",
        path: "/auth/register",
        icon: <UserCheck className="h-4 w-4" />,
        element: <Register />,
      },
    ],
  },

  // USER
  {
    group: "User Dashboard",
    role: "user",
    items: [
      {
        title: "Dashboard",
        path: "/dashboard/user",
        icon: <BarChart3 className="h-4 w-4" />,
        element: (
          <RoleProtectedRoute allowedRoles={["user"]}>
            <UserDashboard />
          </RoleProtectedRoute>
        ),
      },
      {
        title: "Fuel Order",
        path: "/dashboard/user/fuel-order",
        icon: <Fuel className="h-4 w-4" />,
        element: (
          <RoleProtectedRoute allowedRoles={["user"]}>
            <FuelOrder />
          </RoleProtectedRoute>
        ),
      },
      {
        title: "Garage Service",
        path: "/dashboard/user/garage-service",
        icon: <Wrench className="h-4 w-4" />,
        element: (
          <RoleProtectedRoute allowedRoles={["user"]}>
            <GarageService />
          </RoleProtectedRoute>
        ),
      },
      {
        title: "Order Tracking",
        path: "/dashboard/user/order-tracking",
        icon: <Package className="h-4 w-4" />,
        element: (
          <RoleProtectedRoute allowedRoles={["user"]}>
            <OrderTracking />
          </RoleProtectedRoute>
        ),
      },
      {
        title: "Payment",
        path: "/dashboard/user/payment",
        icon: <CreditCard className="h-4 w-4" />,
        element: (
          <RoleProtectedRoute allowedRoles={["user"]}>
            <PaymentPage />
          </RoleProtectedRoute>
        ),
      },
      {
        title: "Reviews",
        path: "/dashboard/user/reviews",
        icon: <Star className="h-4 w-4" />,
        element: (
          <RoleProtectedRoute allowedRoles={["user"]}>
            <Reviews />
          </RoleProtectedRoute>
        ),
      },
      {
        title: "Notifications",
        path: "/dashboard/user/notifications",
        icon: <Bell className="h-4 w-4" />,
        element: (
          <RoleProtectedRoute allowedRoles={["user"]}>
            <Notifications />
          </RoleProtectedRoute>
        ),
      },
      {
        title: "Settings",
        path: "/dashboard/user/settings",
        icon: <Settings className="h-4 w-4" />,
        element: (
          <RoleProtectedRoute allowedRoles={["user"]}>
            <UserSettings />
          </RoleProtectedRoute>
        ),
      },
      {
        title: "Support",
        path: "/dashboard/user/support",
        icon: <HelpCircle className="h-4 w-4" />,
        element: (
          <RoleProtectedRoute allowedRoles={["user"]}>
            <Support />
          </RoleProtectedRoute>
        ),
      },
    ],
  },

  // DRIVER
  {
    group: "Driver Dashboard",
    role: "driver",
    items: [
      {
        title: "Dashboard",
        path: "/dashboard/driver",
        icon: <Truck className="h-4 w-4" />,
        element: (
          <RoleProtectedRoute allowedRoles={["driver"]}>
            <DriverDashboard />
          </RoleProtectedRoute>
        ),
      },
      {
        title: "Active Deliveries",
        path: "/dashboard/driver/active-deliveries",
        icon: <Activity className="h-4 w-4" />,
        element: (
          <RoleProtectedRoute allowedRoles={["driver"]}>
            <ActiveDeliveries />
          </RoleProtectedRoute>
        ),
      },
      {
        title: "Earnings",
        path: "/dashboard/driver/earnings",
        icon: <CreditCard className="h-4 w-4" />,
        element: (
          <RoleProtectedRoute allowedRoles={["driver"]}>
            <Earnings />
          </RoleProtectedRoute>
        ),
      },
      {
        title: "Schedule",
        path: "/dashboard/driver/schedule",
        icon: <Calendar className="h-4 w-4" />,
        element: (
          <RoleProtectedRoute allowedRoles={["driver"]}>
            <Schedule />
          </RoleProtectedRoute>
        ),
      },
      {
        title: "Vehicle Status",
        path: "/dashboard/driver/vehicle-status",
        icon: <Car className="h-4 w-4" />,
        element: (
          <RoleProtectedRoute allowedRoles={["driver"]}>
            <VehicleStatus />
          </RoleProtectedRoute>
        ),
      },
      {
        title: "Notifications",
        path: "/dashboard/driver/notifications",
        icon: <Bell className="h-4 w-4" />,
        element: (
          <RoleProtectedRoute allowedRoles={["driver"]}>
            <DriverNotifications />
          </RoleProtectedRoute>
        ),
      },
      {
        title: "Settings",
        path: "/dashboard/driver/settings",
        icon: <Settings className="h-4 w-4" />,
        element: (
          <RoleProtectedRoute allowedRoles={["driver"]}>
            <DriverSettings />
          </RoleProtectedRoute>
        ),
      },
    ],
  },

  // MECHANIC
  {
    group: "Mechanic Dashboard",
    role: "mechanic",
    items: [
      {
        title: "Dashboard",
        path: "/dashboard/mechanic",
        icon: <Wrench className="h-4 w-4" />,
        element: (
          <RoleProtectedRoute allowedRoles={["mechanic"]}>
            <MechanicDashboard />
          </RoleProtectedRoute>
        ),
      },
      {
        title: "Appointments",
        path: "/dashboard/mechanic/appointments",
        icon: <Calendar className="h-4 w-4" />,
        element: (
          <RoleProtectedRoute allowedRoles={["mechanic"]}>
            <AppointmentManagement />
          </RoleProtectedRoute>
        ),
      },
      {
        title: "Customers",
        path: "/dashboard/mechanic/customers",
        icon: <Users className="h-4 w-4" />,
        element: (
          <RoleProtectedRoute allowedRoles={["mechanic"]}>
            <CustomerManagement />
          </RoleProtectedRoute>
        ),
      },
      {
        title: "Inventory",
        path: "/dashboard/mechanic/inventory",
        icon: <Package className="h-4 w-4" />,
        element: (
          <RoleProtectedRoute allowedRoles={["mechanic"]}>
            <MechanicInventoryManagement />
          </RoleProtectedRoute>
        ),
      },
      {
        title: "Services",
        path: "/dashboard/mechanic/services",
        icon: <Wrench className="h-4 w-4" />,
        element: (
          <RoleProtectedRoute allowedRoles={["mechanic"]}>
            <MechanicServiceManagement />
          </RoleProtectedRoute>
        ),
      },
    ],
  },

  // ADMIN
  {
    group: "Admin Dashboard",
    role: "admin",
    items: [
      {
        title: "Dashboard",
        path: "/dashboard/admin",
        icon: <BarChart3 className="h-4 w-4" />,
        element: (
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </RoleProtectedRoute>
        ),
      },
      {
        title: "User Management",
        path: "/dashboard/admin/users",
        icon: <Users className="h-4 w-4" />,
        element: (
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <UserManagement />
          </RoleProtectedRoute>
        ),
      },
      {
        title: "Fuel Management",
        path: "/dashboard/admin/fuel",
        icon: <Fuel className="h-4 w-4" />,
        element: (
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <FuelManagement />
          </RoleProtectedRoute>
        ),
      },
      {
        title: "Service Management",
        path: "/dashboard/admin/services",
        icon: <Wrench className="h-4 w-4" />,
        element: (
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <AdminServiceManagement />
          </RoleProtectedRoute>
        ),
      },
      {
        title: "Analytics",
        path: "/dashboard/admin/analytics",
        icon: <BarChart3 className="h-4 w-4" />,
        element: (
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <Analytics />
          </RoleProtectedRoute>
        ),
      },
      {
        title: "Payments",
        path: "/dashboard/admin/payments",
        icon: <CreditCard className="h-4 w-4" />,
        element: (
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <PaymentManagement />
          </RoleProtectedRoute>
        ),
      },
      {
        title: "Inventory",
        path: "/dashboard/admin/inventory",
        icon: <Package className="h-4 w-4" />,
        element: (
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <AdminInventoryManagement />
          </RoleProtectedRoute>
        ),
      },
      {
        title: "Support",
        path: "/dashboard/admin/support",
        icon: <LifeBuoy className="h-4 w-4" />,
        element: (
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <SupportManagement />
          </RoleProtectedRoute>
        ),
      },
      {
        title: "Settings",
        path: "/dashboard/admin/settings",
        icon: <Settings className="h-4 w-4" />,
        element: (
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <AdminSettings />
          </RoleProtectedRoute>
        ),
      },
    ],
  },

  // 404
  {
    group: "Misc",
    items: [
      {
        title: "Not Found",
        path: "*",
        icon: <HelpCircle className="h-4 w-4" />,
        element: <NotFound />,
      },
    ],
  },
];
