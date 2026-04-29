import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.25:3000',
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized access - potential token expiration');
    }
    return Promise.reject(error);
  }
);

export default api;
