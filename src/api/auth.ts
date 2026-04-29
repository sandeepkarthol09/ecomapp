import api from './axiosInstance';
import type { LoginResponse } from '../types/auth';

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/users/login', {
      email,
      password,
    });
    return response.data;
  },
};
