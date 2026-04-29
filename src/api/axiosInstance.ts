import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.25:3000',
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
  },
});

// Add request interceptor to include tokens in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors like 401 Unauthorized
    if (error.response?.status === 401) {
       // Optional: logout user or refresh token
       console.error('Unauthorized access - potential token expiration');
    }
    return Promise.reject(error);
  }
);

export default api;
