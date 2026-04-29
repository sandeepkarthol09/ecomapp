import api from '../../api/axiosInstance';
import type { LoginResponse, RegisterRequest } from '../types/auth';

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/users/login', {
      email,
      password,
    });
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/users/createuser', data);
    return response.data;
  },
};
