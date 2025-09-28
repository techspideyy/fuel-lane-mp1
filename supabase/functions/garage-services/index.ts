import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GarageServiceRequest {
  service_type: string;
  package?: string;
  scheduled_date?: string;
  notes?: string;
  estimated_cost?: number;
}

interface CreateBookingRequest {
  service_type: string;
  package?: string;
  scheduled_date?: string;
  notes?: string;
  estimated_cost?: number;
}

interface AssignMechanicRequest {
  service_id: string;
  mechanic_id: string;
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
      // Create a new garage service booking
      const bookingData: CreateBookingRequest = (await req.json()) as CreateBookingRequest;
      
      const { data, error } = await supabaseClient
        .from('garage_services')
        .insert({
          user_id: user.id,
          service_type: bookingData.service_type,
          package: bookingData.package,
          scheduled_date: bookingData.scheduled_date,
          notes: bookingData.notes,
          estimated_cost: bookingData.estimated_cost,
          status: 'requested'
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating garage service:', error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (method === 'POST' && url.pathname.endsWith('/assign-mechanic')) {
      // Assign mechanic to service (admin/system only)
      const assignData: AssignMechanicRequest = (await req.json()) as AssignMechanicRequest;
      
      // Check if user has admin role or is a mechanic accepting the service
      const { data: profile } = await supabaseClient
        .from('profiles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      if (!profile || (profile.role !== 'admin' && profile.role !== 'mechanic')) {
        return new Response(JSON.stringify({ error: 'Insufficient permissions' }), {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const { data, error } = await supabaseClient
        .from('garage_services')
        .update({
          mechanic_id: assignData.mechanic_id,
          status: 'confirmed'
        })
        .eq('id', assignData.service_id)
        .select()
        .single();

      if (error) {
        console.error('Error assigning mechanic:', error);
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
      // Update service status
      const serviceId = url.pathname.split('/').pop();
      const { status, actual_cost } = (await req.json()) as { status: string; actual_cost?: number };
      
      const updateData: any = { status };
      if (actual_cost !== undefined) {
        updateData.actual_cost = actual_cost;
      }

      const { data, error } = await supabaseClient
        .from('garage_services')
        .update(updateData)
        .eq('id', serviceId)
        .select()
        .single();

      if (error) {
        console.error('Error updating service status:', error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (method === 'GET' && url.pathname.endsWith('/my-services')) {
      // Get user's garage services
      const { data, error } = await supabaseClient
        .from('garage_services')
        .select(`
          *,
          mechanics (
            id,
            name,
            phone,
            rating,
            skills
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching services:', error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (method === 'GET' && url.pathname.endsWith('/mechanic-services')) {
      // Get services for mechanic
      const { data: mechanic } = await supabaseClient
        .from('mechanics')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!mechanic) {
        return new Response(JSON.stringify({ error: 'Mechanic profile not found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const { data, error } = await supabaseClient
        .from('garage_services')
        .select(`
          *,
          profiles!garage_services_user_id_fkey (
            name,
            phone,
            address
          )
        `)
        .eq('mechanic_id', mechanic.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching mechanic services:', error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (method === 'GET' && url.pathname.endsWith('/available-mechanics')) {
      // Get available mechanics
      const { data, error } = await supabaseClient
        .from('mechanics')
        .select('*')
        .eq('availability', true)
        .order('rating', { ascending: false });

      if (error) {
        console.error('Error fetching mechanics:', error);
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
    console.error('Error in garage-services function:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};

serve(handler);