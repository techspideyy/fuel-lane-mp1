import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface UpdateStatusRequest {
  status: 'available' | 'busy' | 'offline';
}

interface AcceptOrderRequest {
  order_id: string;
}

interface RejectOrderRequest {
  order_id: string;
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

    // Verify user is a driver
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    if (!profile || profile.role !== 'driver') {
      return new Response(JSON.stringify({ error: 'Access denied. Driver role required.' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get driver record
    const { data: driver, error: driverError } = await supabaseClient
      .from('drivers')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (driverError || !driver) {
      return new Response(JSON.stringify({ error: 'Driver profile not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const url = new URL(req.url);
    const method = req.method;

    if (method === 'PUT' && url.pathname.endsWith('/status')) {
      // Update driver status
      const { status }: UpdateStatusRequest = (await req.json()) as UpdateStatusRequest;
      
      const { data, error } = await supabaseClient
        .from('drivers')
        .update({ status })
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating driver status:', error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (method === 'POST' && url.pathname.endsWith('/accept-order')) {
      // Accept an order
      const { order_id }: AcceptOrderRequest = (await req.json()) as AcceptOrderRequest;
      
      // Update order with driver assignment
      const { data: orderData, error: orderError } = await supabaseClient
        .from('fuel_orders')
        .update({
          driver_id: driver.id,
          status: 'confirmed'
        })
        .eq('id', order_id)
        .eq('status', 'pending') // Only accept pending orders
        .select()
        .single();

      if (orderError) {
        console.error('Error accepting order:', orderError);
        return new Response(JSON.stringify({ error: orderError.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Update driver status to busy
      await supabaseClient
        .from('drivers')
        .update({ status: 'busy' })
        .eq('user_id', user.id);

      return new Response(JSON.stringify({ data: orderData }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (method === 'POST' && url.pathname.endsWith('/complete-order')) {
      // Complete an order
      const { order_id }: AcceptOrderRequest = (await req.json()) as AcceptOrderRequest;
      
      const { data, error } = await supabaseClient
        .from('fuel_orders')
        .update({
          driver_id: null,
          status: 'pending'
        })
        .eq('id', order_id)
        .eq('driver_id', driver.id)
        .select()
        .single();

      if (error) {
        console.error('Error rejecting order:', error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (method === 'POST' && url.pathname.endsWith('/reject-order')) {
      // Reject an order
      const { order_id }: RejectOrderRequest = (await req.json()) as RejectOrderRequest;
      
      // Update order status to delivered
      const { data: orderData, error: orderError } = await supabaseClient
        .from('fuel_orders')
        .update({ status: 'delivered' })
        .eq('id', order_id)
        .eq('driver_id', driver.id)
        .select()
        .single();

      if (orderError) {
        console.error('Error completing order:', orderError);
        return new Response(JSON.stringify({ error: orderError.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Update driver earnings
      const { error: earningsError } = await supabaseClient
        .from('drivers')
        .update({
          earnings: driver.earnings + (orderData.price * 0.1), // 10% commission
          status: 'available'
        })
        .eq('user_id', user.id);

      if (earningsError) {
        console.error('Error updating earnings:', earningsError);
      }

      return new Response(JSON.stringify({ data: orderData }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (method === 'GET' && url.pathname.endsWith('/available-orders')) {
      // Get available orders for driver
      const { data, error } = await supabaseClient
        .from('fuel_orders')
        .select(`
          *,
          profiles!fuel_orders_user_id_fkey (
            name,
            phone
          )
        `)
        .eq('status', 'pending')
        .is('driver_id', null)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching available orders:', error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (method === 'GET' && url.pathname.endsWith('/dashboard')) {
      // Get driver dashboard data
      const { data: orders, error: ordersError } = await supabaseClient
        .from('fuel_orders')
        .select('*')
        .eq('driver_id', driver.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (ordersError) {
        console.error('Error fetching driver orders:', ordersError);
      }

      const dashboardData = {
        driver,
        recent_orders: orders || [],
        stats: {
          total_orders: orders?.length || 0,
          total_earnings: driver.earnings,
          current_status: driver.status
        }
      };

      return new Response(JSON.stringify({ data: dashboardData }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in driver-workflow function:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};

serve(handler);