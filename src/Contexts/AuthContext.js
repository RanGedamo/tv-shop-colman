// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);





export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      // קודם מנסים להשתמש ב-access token הקיים
      try {
        const response = await authService.getCurrentUser();
        setUser(response.user);
        setLoading(false);
        return;
      } catch (accessError) {
        // אם יש שגיאת 401, ממשיכים לבדיקת refresh
        if (accessError.response?.status !== 401) {
          throw accessError;
        }
      }

      // אם הגענו לכאן, ננסה לרענן את הטוקן
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

  const login = async (email, password) => {
    const response = await authService.login(email, password);
    setUser(response.user);
    return response;
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
// שימוש בטוח בערכי הקונטקסט
export const useAuthStatus = () => {
  const { loading, isAuthenticated, isAdmin } = useAuth();
  return { loading, isAuthenticated, isAdmin };
};

export const useAuthActions = () => {
  const { login, logout } = useAuth();
  return { login, logout };
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthProvider;