// src/services/authService.js
import api from '../utils/axios';

export const authService = {
    getCurrentUser: async () => {
      const response = await api.get('/auth/me');
      return response.data;
    },
  
    login: async (email, password) => {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    },
  
    register: async (userData) => {
      const response = await api.post('/auth/register', userData);
      return response.data;
    },
  
    refresh: async () => {
      const response = await api.post('/auth/refresh');
      return response.data;
    },
  
    logout: async () => {
      const response = await api.post('/auth/logout');
      return response.data;
    }
  };