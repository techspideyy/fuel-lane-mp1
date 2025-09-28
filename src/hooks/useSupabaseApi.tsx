import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useSupabaseApi = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const callEdgeFunction = async (
    functionName: string,
    path: string = '',
    options: {
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
      body?: any;
      showSuccessToast?: boolean;
      successMessage?: string;
    } = {}
  ) => {
    setLoading(true);
    try {
      const { method = 'GET', body, showSuccessToast = false, successMessage } = options;
      
      const { data, error } = await supabase.functions.invoke(functionName, {
        method,
        body: body ? JSON.stringify(body) : undefined,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (error) {
        throw error;
      }

      if (showSuccessToast && successMessage) {
        toast({
          title: "Success",
          description: successMessage,
        });
      }

      return data;
    } catch (error: any) {
      console.error(`Error calling ${functionName}:`, error);
      toast({
        title: "Error",
        description: error.message || 'An unexpected error occurred',
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Fuel Orders API
  const fuelOrdersApi = {
    create: (orderData: any) =>
      callEdgeFunction('fuel-orders', '/create', {
        method: 'POST',
        body: orderData,
        showSuccessToast: true,
        successMessage: 'Fuel order created successfully!'
      }),

    getMyOrders: () =>
      callEdgeFunction('fuel-orders', '/my-orders'),

    getDriverOrders: () =>
      callEdgeFunction('fuel-orders', '/driver-orders'),

    assignDriver: (orderId: string, driverId: string) =>
      callEdgeFunction('fuel-orders', '/assign-driver', {
        method: 'POST',
        body: { order_id: orderId, driver_id: driverId },
        showSuccessToast: true,
        successMessage: 'Driver assigned successfully!'
      }),

    updateStatus: (orderId: string, status: string) =>
      callEdgeFunction('fuel-orders', `/status/${orderId}`, {
        method: 'PUT',
        body: { status },
        showSuccessToast: true,
        successMessage: 'Order status updated!'
      }),
  };

  // Garage Services API
  const garageServicesApi = {
    create: (serviceData: any) =>
      callEdgeFunction('garage-services', '/create', {
        method: 'POST',
        body: serviceData,
        showSuccessToast: true,
        successMessage: 'Service booking created successfully!'
      }),

    getMyServices: () =>
      callEdgeFunction('garage-services', '/my-services'),

    getMechanicServices: () =>
      callEdgeFunction('garage-services', '/mechanic-services'),

    getAvailableMechanics: () =>
      callEdgeFunction('garage-services', '/available-mechanics'),

    assignMechanic: (serviceId: string, mechanicId: string) =>
      callEdgeFunction('garage-services', '/assign-mechanic', {
        method: 'POST',
        body: { service_id: serviceId, mechanic_id: mechanicId },
        showSuccessToast: true,
        successMessage: 'Mechanic assigned successfully!'
      }),

    updateStatus: (serviceId: string, status: string, actualCost?: number) =>
      callEdgeFunction('garage-services', `/status/${serviceId}`, {
        method: 'PUT',
        body: { status, actual_cost: actualCost },
        showSuccessToast: true,
        successMessage: 'Service status updated!'
      }),
  };

  // Driver Workflow API
  const driverWorkflowApi = {
    updateStatus: (status: 'available' | 'busy' | 'offline') =>
      callEdgeFunction('driver-workflow', '/status', {
        method: 'PUT',
        body: { status },
        showSuccessToast: true,
        successMessage: 'Status updated successfully!'
      }),

    acceptOrder: (orderId: string) =>
      callEdgeFunction('driver-workflow', '/accept-order', {
        method: 'POST',
        body: { order_id: orderId },
        showSuccessToast: true,
        successMessage: 'Order accepted successfully!'
      }),

    rejectOrder: (orderId: string) =>
      callEdgeFunction('driver-workflow', '/reject-order', {
        method: 'POST',
        body: { order_id: orderId },
        showSuccessToast: true,
        successMessage: 'Order rejected successfully!'
      }),

    completeOrder: (orderId: string) =>
      callEdgeFunction('driver-workflow', '/complete-order', {
        method: 'POST',
        body: { order_id: orderId },
        showSuccessToast: true,
        successMessage: 'Order completed successfully!'
      }),

    getAvailableOrders: () =>
      callEdgeFunction('driver-workflow', '/available-orders'),

    getDashboard: () =>
      callEdgeFunction('driver-workflow', '/dashboard'),
  };

  // Mechanic Workflow API
  const mechanicWorkflowApi = {
    updateAvailability: (availability: boolean) =>
      callEdgeFunction('mechanic-workflow', '/availability', {
        method: 'PUT',
        body: { availability },
        showSuccessToast: true,
        successMessage: 'Availability updated successfully!'
      }),

    acceptService: (serviceId: string) =>
      callEdgeFunction('mechanic-workflow', '/accept-service', {
        method: 'POST',
        body: { service_id: serviceId },
        showSuccessToast: true,
        successMessage: 'Service accepted successfully!'
      }),

    rejectService: (serviceId: string) =>
      callEdgeFunction('mechanic-workflow', '/reject-service', {
        method: 'POST',
        body: { service_id: serviceId },
        showSuccessToast: true,
        successMessage: 'Service rejected successfully!'
      }),

    startService: (serviceId: string) =>
      callEdgeFunction('mechanic-workflow', '/start-service', {
        method: 'POST',
        body: { service_id: serviceId },
        showSuccessToast: true,
        successMessage: 'Service started successfully!'
      }),

    completeService: (serviceId: string, actualCost?: number) =>
      callEdgeFunction('mechanic-workflow', '/complete-service', {
        method: 'POST',
        body: { service_id: serviceId, actual_cost: actualCost },
        showSuccessToast: true,
        successMessage: 'Service completed successfully!'
      }),

    getAvailableServices: () =>
      callEdgeFunction('mechanic-workflow', '/available-services'),

    getDashboard: () =>
      callEdgeFunction('mechanic-workflow', '/dashboard'),
  };

  return {
    loading,
    fuelOrdersApi,
    garageServicesApi,
    driverWorkflowApi,
    mechanicWorkflowApi,
    callEdgeFunction,
  };
};