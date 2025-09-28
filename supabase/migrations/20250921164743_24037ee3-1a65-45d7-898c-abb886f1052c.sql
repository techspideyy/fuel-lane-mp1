-- Create enums for better data integrity
CREATE TYPE public.user_role AS ENUM ('user', 'driver', 'mechanic', 'admin');
CREATE TYPE public.fuel_type AS ENUM ('petrol', 'diesel', 'premium');
CREATE TYPE public.order_status AS ENUM ('pending', 'confirmed', 'in_progress', 'delivered', 'cancelled');
CREATE TYPE public.service_status AS ENUM ('requested', 'confirmed', 'in_progress', 'completed', 'cancelled');
CREATE TYPE public.driver_status AS ENUM ('available', 'busy', 'offline');
CREATE TYPE public.payment_method AS ENUM ('card', 'cash', 'wallet');
CREATE TYPE public.payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- Profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  name TEXT NOT NULL,
  phone TEXT,
  role user_role NOT NULL DEFAULT 'user',
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Vehicles table
CREATE TABLE public.vehicles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  type TEXT NOT NULL,
  model TEXT NOT NULL,
  reg_number TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Drivers table
CREATE TABLE public.drivers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  vehicle_type TEXT NOT NULL,
  status driver_status NOT NULL DEFAULT 'offline',
  earnings DECIMAL(10,2) DEFAULT 0.00,
  rating DECIMAL(3,2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Mechanics table
CREATE TABLE public.mechanics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  skills TEXT[],
  rating DECIMAL(3,2) DEFAULT 0.00,
  availability BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Fuel Orders table
CREATE TABLE public.fuel_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  fuel_type fuel_type NOT NULL,
  quantity DECIMAL(8,2) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  location TEXT NOT NULL,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  schedule_time TIMESTAMP WITH TIME ZONE,
  status order_status NOT NULL DEFAULT 'pending',
  driver_id UUID,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Garage Services table
CREATE TABLE public.garage_services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  service_type TEXT NOT NULL,
  package TEXT,
  mechanic_id UUID,
  scheduled_date TIMESTAMP WITH TIME ZONE,
  status service_status NOT NULL DEFAULT 'requested',
  notes TEXT,
  estimated_cost DECIMAL(10,2),
  actual_cost DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Payments table
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID,
  service_id UUID,
  user_id UUID NOT NULL,
  method payment_method NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status payment_status NOT NULL DEFAULT 'pending',
  transaction_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add foreign key constraints
ALTER TABLE public.vehicles ADD CONSTRAINT fk_vehicles_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.drivers ADD CONSTRAINT fk_drivers_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.mechanics ADD CONSTRAINT fk_mechanics_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.fuel_orders ADD CONSTRAINT fk_fuel_orders_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.fuel_orders ADD CONSTRAINT fk_fuel_orders_driver FOREIGN KEY (driver_id) REFERENCES public.drivers(id) ON DELETE SET NULL;
ALTER TABLE public.garage_services ADD CONSTRAINT fk_garage_services_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.garage_services ADD CONSTRAINT fk_garage_services_mechanic FOREIGN KEY (mechanic_id) REFERENCES public.mechanics(id) ON DELETE SET NULL;
ALTER TABLE public.payments ADD CONSTRAINT fk_payments_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.payments ADD CONSTRAINT fk_payments_fuel_order FOREIGN KEY (order_id) REFERENCES public.fuel_orders(id) ON DELETE CASCADE;
ALTER TABLE public.payments ADD CONSTRAINT fk_payments_garage_service FOREIGN KEY (service_id) REFERENCES public.garage_services(id) ON DELETE CASCADE;

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mechanics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fuel_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.garage_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for vehicles
CREATE POLICY "Users can view their own vehicles" ON public.vehicles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own vehicles" ON public.vehicles FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for drivers (drivers can view their own data, users can view driver info for orders)
CREATE POLICY "Drivers can view their own data" ON public.drivers FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Drivers can update their own data" ON public.drivers FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Public can view driver basic info" ON public.drivers FOR SELECT USING (true);

-- Create RLS policies for mechanics
CREATE POLICY "Mechanics can view their own data" ON public.mechanics FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Mechanics can update their own data" ON public.mechanics FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Public can view mechanic basic info" ON public.mechanics FOR SELECT USING (true);

-- Create RLS policies for fuel orders
CREATE POLICY "Users can view their own fuel orders" ON public.fuel_orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create fuel orders" ON public.fuel_orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own fuel orders" ON public.fuel_orders FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Drivers can view assigned orders" ON public.fuel_orders FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.drivers WHERE drivers.user_id = auth.uid() AND drivers.id = fuel_orders.driver_id)
);

-- Create RLS policies for garage services
CREATE POLICY "Users can view their own garage services" ON public.garage_services FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create garage services" ON public.garage_services FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own garage services" ON public.garage_services FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Mechanics can view assigned services" ON public.garage_services FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.mechanics WHERE mechanics.user_id = auth.uid() AND mechanics.id = garage_services.mechanic_id)
);

-- Create RLS policies for payments
CREATE POLICY "Users can view their own payments" ON public.payments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create payments" ON public.payments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_vehicles_user_id ON public.vehicles(user_id);
CREATE INDEX idx_drivers_user_id ON public.drivers(user_id);
CREATE INDEX idx_drivers_status ON public.drivers(status);
CREATE INDEX idx_mechanics_user_id ON public.mechanics(user_id);
CREATE INDEX idx_mechanics_availability ON public.mechanics(availability);
CREATE INDEX idx_fuel_orders_user_id ON public.fuel_orders(user_id);
CREATE INDEX idx_fuel_orders_status ON public.fuel_orders(status);
CREATE INDEX idx_fuel_orders_driver_id ON public.fuel_orders(driver_id);
CREATE INDEX idx_garage_services_user_id ON public.garage_services(user_id);
CREATE INDEX idx_garage_services_mechanic_id ON public.garage_services(mechanic_id);
CREATE INDEX idx_garage_services_status ON public.garage_services(status);
CREATE INDEX idx_payments_user_id ON public.payments(user_id);
CREATE INDEX idx_payments_status ON public.payments(status);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON public.vehicles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_drivers_updated_at BEFORE UPDATE ON public.drivers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_mechanics_updated_at BEFORE UPDATE ON public.mechanics FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_fuel_orders_updated_at BEFORE UPDATE ON public.fuel_orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_garage_services_updated_at BEFORE UPDATE ON public.garage_services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();