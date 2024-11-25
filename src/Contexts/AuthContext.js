// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const register = async (userData) => {
    const response = await authService.register(userData);
    if (response.accessToken) {
      localStorage.setItem('token', response.accessToken);
      setUser(response.user);
    }
    return response;
  };

  const login = async (email, password) => {
    const response = await authService.login(email, password);
    if (response.accessToken) {
      localStorage.setItem('token', response.accessToken);
      setUser(response.user);
    }
    return response;
  };


  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      localStorage.removeItem('token');

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

  if (loading) {
    return <div>טוען...</div>;
  }
  return (
    <AuthContext.Provider value={value}>
      {children}
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
// שימוש בטוח בערכי הקונטקסט
export const useAuthStatus = () => {
  const { loading, isAuthenticated, isAdmin } = useAuth();
  return { loading, isAuthenticated, isAdmin };
};

export const useAuthActions = () => {
  const { login, register, logout, updateUser } = useAuth();
  return { login, register, logout, updateUser };
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};
