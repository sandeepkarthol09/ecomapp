import api from './axiosInstance';
import type { CreateOrderRequest, CreateOrderResponse, GetOrdersListResponse } from '../types/order';

export const orderService = {
  createOrder: async (payload: CreateOrderRequest): Promise<CreateOrderResponse> => {
    const response = await api.post<CreateOrderResponse>('/orders/createorder', payload);
    return response.data;
  },

  getMyOrders: async (): Promise<GetOrdersListResponse> => {
    // Different backends use different route names; try common ones.
    const candidates = ['/orders/getorders', '/orders/getorder', '/orders/myorders', '/orders'];
    let lastError: unknown;

    for (const path of candidates) {
      try {
        const response = await api.get<GetOrdersListResponse>(path);
        return response.data;
      } catch (err) {
        lastError = err;
      }
    }

    throw lastError;
  },

  deleteOrder: async (orderId: string): Promise<CreateOrderResponse> => {
    const response = await api.delete<CreateOrderResponse>(`/orders/deleteorder/${orderId}`);
    return response.data;
  },
};

