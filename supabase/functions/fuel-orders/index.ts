import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface FuelOrderRequest {
  fuel_type: 'petrol' | 'diesel' | 'premium';
  quantity: number;
  price: number;
  location: string;
  latitude?: number;
  longitude?: number;
  schedule_time?: string;
  notes?: string;
}

interface CreateOrderRequest {
  fuel_type: 'petrol' | 'diesel' | 'premium';
  quantity: number;
  price: number;
  location: string;
  latitude?: number;
  longitude?: number;
  schedule_time?: string;
  notes?: string;
}

interface AssignDriverRequest {
  order_id: string;
  driver_id: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: { headers: { Authorization: req.headers.get('Authorization')! } }
      }
    );

    // Get the authenticated user
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const url = new URL(req.url);
    const method = req.method;

    if (method === 'POST' && url.pathname.endsWith('/create')) {
      // Create a new fuel order
      const orderData: CreateOrderRequest = (await req.json()) as CreateOrderRequest;
      
      const { data, error } = await supabaseClient
        .from('fuel_orders')
        .insert({
          user_id: user.id,
          fuel_type: orderData.fuel_type,
          quantity: orderData.quantity,
          price: orderData.price,
          location: orderData.location,
          latitude: orderData.latitude,
          longitude: orderData.longitude,
          schedule_time: orderData.schedule_time,
          notes: orderData.notes,
          status: 'pending'
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating fuel order:', error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (method === 'PUT' && url.pathname.endsWith('/assign-driver')) {
      // Assign driver to order (admin/system only)
      const assignData: AssignDriverRequest = (await req.json()) as AssignDriverRequest;
      
      // Check if user has admin role or is a driver accepting the order
      const { data: profile } = await supabaseClient
        .from('profiles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      if (!profile || (profile.role !== 'admin' && profile.role !== 'driver')) {
        return new Response(JSON.stringify({ error: 'Insufficient permissions' }), {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const { data, error } = await supabaseClient
        .from('fuel_orders')
        .update({
          driver_id: assignData.driver_id,
          status: 'confirmed'
        })
        .eq('id', assignData.order_id)
        .select()
        .single();

      if (error) {
        console.error('Error assigning driver:', error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (method === 'PUT' && url.pathname.includes('/status/')) {
      // Update order status
      const orderId = url.pathname.split('/').pop();
      const { status } = (await req.json()) as { status: string };
      
      const { data, error } = await supabaseClient
        .from('fuel_orders')
        .update({ status })
        .eq('id', orderId)
        .select()
        .single();

      if (error) {
        console.error('Error updating order status:', error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (method === 'GET' && url.pathname.endsWith('/my-orders')) {
      // Get user's orders
      const { data, error } = await supabaseClient
        .from('fuel_orders')
        .select(`
          *,
          drivers (
            id,
            name,
            phone,
            rating
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (method === 'GET' && url.pathname.endsWith('/driver-orders')) {
      // Get orders for driver
      const { data: driver } = await supabaseClient
        .from('drivers')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!driver) {
        return new Response(JSON.stringify({ error: 'Driver profile not found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const { data, error } = await supabaseClient
        .from('fuel_orders')
        .select(`
          *,
          profiles!fuel_orders_user_id_fkey (
            name,
            phone
          )
        `)
        .eq('driver_id', driver.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching driver orders:', error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in fuel-orders function:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};

serve(handler);