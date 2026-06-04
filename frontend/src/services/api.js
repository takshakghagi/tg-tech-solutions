import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  timeout: 10000,
});

// Request interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — Login page pe redirect mat karo
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Sirf 401 pe redirect karo — login page pe nahi
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      // Agar already login page pe hai toh redirect mat karo
      if (currentPath !== '/login' && currentPath !== '/register') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    // Error properly throw karo
    return Promise.reject(error);
  }
);

export default API;