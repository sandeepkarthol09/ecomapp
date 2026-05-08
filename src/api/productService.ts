import api from './axiosInstance';
import type { ProductResponse } from '../types/product';

export const productService = {
  getProducts: async (page: number = 1, limit: number = 10): Promise<ProductResponse> => {
    const response = await api.get<ProductResponse>(`/products/getproduct`, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  },
};
