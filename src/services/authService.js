// src/services/authService.js
import api from '../utils/axios';
export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      // if (response.data.token) {
      //   localStorage.setItem('token', response.data.token);
      // }
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'The server is not active');
    }
  },
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      // if (response.data.token) {
      //   localStorage.setItem('token', response.data.token);
      // }
      return response.data;
    } catch (error) {
      if (error.response) {
        // Handle server errors
        if (error.response.status === 400) {
          // Validation errors
          throw {
            status: 400,
            errors: error.response.data.errors || { general: error.response.data.message }
          };
        } else if (error.response.status === 409) {
          // Conflict - Email already exists
          throw {
            status: 409,
            errors: { email: 'Email already exists' }
          };
        } else {
          // Other server errors
          throw {
            status: error.response.status,
            errors: { general: 'Registration failed. Please try again later.' }
          };
        }
      } else if (error.request) {
        // Network errors
        throw {
          status: 0,
          errors: { general: 'Network error. Please check your connection.' }
        };
      } else {
        // Other errors
        throw {
          status: 500,
          errors: { general: 'An unexpected error occurred.' }
        };
      }
    }
  },
  logout: async (user) => {
    try {
      await api.post('/auth/logout',user);
      // localStorage.removeItem('token');
    } catch (error) {
      throw new Error(error.response?.data?.message );
    }
  },
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message );
    }
  }
};