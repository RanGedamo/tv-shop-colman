import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      // First try using existing access token
      try {
        const response = await authService.getCurrentUser();
        setUser(response.user);
        setLoading(false);
        return;
      } catch (accessError) {
        // If 401 error, proceed to refresh check
        if (accessError.response?.status !== 401) {
          throw accessError;
        }
      }

      // Try refreshing token if available
      const hasRefreshToken = document.cookie.includes('refreshToken');
      if (hasRefreshToken) {
        const refreshResponse = await authService.refresh();
        setUser(refreshResponse.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      setUser(response.user);
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error; // Re-throw to handle in the component
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      setUser(response.user);
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error; // Re-throw to handle in the component
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Safe context value usage
export const useAuthStatus = () => {
  const { loading, isAuthenticated, isAdmin } = useAuth();
  return { loading, isAuthenticated, isAdmin };
};

export const useAuthActions = () => {
  const { login, logout, register } = useAuth();
  return { login, logout, register };
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthProvider;