import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface UpdateAvailabilityRequest {
  availability: boolean;
}

interface AcceptServiceRequest {
  service_id: string;
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

    // Verify user is a mechanic
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    if (!profile || profile.role !== 'mechanic') {
      return new Response(JSON.stringify({ error: 'Access denied. Mechanic role required.' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get mechanic record
    const { data: mechanic, error: mechanicError } = await supabaseClient
      .from('mechanics')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (mechanicError || !mechanic) {
      return new Response(JSON.stringify({ error: 'Mechanic profile not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const url = new URL(req.url);
    const method = req.method;

    if (method === 'PUT' && url.pathname.endsWith('/availability')) {
      // Update mechanic availability
      const { availability }: UpdateAvailabilityRequest = (await req.json()) as UpdateAvailabilityRequest;
      
      const { data, error } = await supabaseClient
        .from('mechanics')
        .update({ availability })
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating mechanic availability:', error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (method === 'POST' && url.pathname.endsWith('/accept-service')) {
      // Accept a service request
      const { service_id }: AcceptServiceRequest = (await req.json()) as AcceptServiceRequest;
      
      // Update service with mechanic assignment
      const { data: serviceData, error: serviceError } = await supabaseClient
        .from('garage_services')
        .update({
          mechanic_id: mechanic.id,
          status: 'confirmed'
        })
        .eq('id', service_id)
        .eq('status', 'requested') // Only accept requested services
        .select()
        .single();

      if (serviceError) {
        console.error('Error accepting service:', serviceError);
        return new Response(JSON.stringify({ error: serviceError.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ data: serviceData }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (method === 'POST' && url.pathname.endsWith('/reject-service')) {
      // Reject a service (remove mechanic assignment)
      const { service_id }: AcceptServiceRequest = (await req.json()) as AcceptServiceRequest;
      
      const { data, error } = await supabaseClient
        .from('garage_services')
        .update({
          mechanic_id: null,
          status: 'requested'
        })
        .eq('id', service_id)
        .eq('mechanic_id', mechanic.id)
        .select()
        .single();

      if (error) {
        console.error('Error rejecting service:', error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (method === 'POST' && url.pathname.endsWith('/start-service')) {
      // Start working on a service
      const { service_id }: AcceptServiceRequest = (await req.json()) as AcceptServiceRequest;
      
      const { data, error } = await supabaseClient
        .from('garage_services')
        .update({ status: 'in_progress' })
        .eq('id', service_id)
        .eq('mechanic_id', mechanic.id)
        .select()
        .single();

      if (error) {
        console.error('Error starting service:', error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (method === 'POST' && url.pathname.endsWith('/complete-service')) {
      // Complete a service
      const { service_id, actual_cost }: AcceptServiceRequest & { actual_cost?: number } = (await req.json()) as AcceptServiceRequest & { actual_cost?: number };
      
      const updateData: any = { status: 'completed' };
      if (actual_cost !== undefined) {
        updateData.actual_cost = actual_cost;
      }

      const { data, error } = await supabaseClient
        .from('garage_services')
        .update(updateData)
        .eq('id', service_id)
        .eq('mechanic_id', mechanic.id)
        .select()
        .single();

      if (error) {
        console.error('Error completing service:', error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (method === 'GET' && url.pathname.endsWith('/available-services')) {
      // Get available service requests for mechanic
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
        .eq('status', 'requested')
        .is('mechanic_id', null)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching available services:', error);
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
      // Get mechanic dashboard data
      const { data: services, error: servicesError } = await supabaseClient
        .from('garage_services')
        .select('*')
        .eq('mechanic_id', mechanic.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (servicesError) {
        console.error('Error fetching mechanic services:', servicesError);
      }

      const dashboardData = {
        mechanic,
        recent_services: services || [],
        stats: {
          total_services: services?.length || 0,
          completed_services: services?.filter((s: any) => s.status === 'completed').length || 0,
          current_availability: mechanic.availability,
          rating: mechanic.rating
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
    console.error('Error in mechanic-workflow function:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};

serve(handler);