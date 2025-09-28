-- Update RLS policies for admin access
CREATE OR REPLACE FUNCTION public.get_user_role(user_id uuid)
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE user_id = $1;
$$;

-- Create admin policies for fuel orders
CREATE POLICY "Admins can view all fuel orders" 
ON public.fuel_orders 
FOR SELECT 
USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admins can update all fuel orders" 
ON public.fuel_orders 
FOR UPDATE 
USING (public.get_user_role(auth.uid()) = 'admin');

-- Create admin policies for garage services
CREATE POLICY "Admins can view all garage services" 
ON public.garage_services 
FOR SELECT 
USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admins can update all garage services" 
ON public.garage_services 
FOR UPDATE 
USING (public.get_user_role(auth.uid()) = 'admin');

-- Create admin policies for drivers
CREATE POLICY "Admins can manage all drivers" 
ON public.drivers 
FOR ALL 
USING (public.get_user_role(auth.uid()) = 'admin');

-- Create admin policies for mechanics
CREATE POLICY "Admins can manage all mechanics" 
ON public.mechanics 
FOR ALL 
USING (public.get_user_role(auth.uid()) = 'admin');

-- Create admin policies for payments
CREATE POLICY "Admins can view all payments" 
ON public.payments 
FOR SELECT 
USING (public.get_user_role(auth.uid()) = 'admin');

-- Create admin policies for profiles
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admins can update all profiles" 
ON public.profiles 
FOR UPDATE 
USING (public.get_user_role(auth.uid()) = 'admin');