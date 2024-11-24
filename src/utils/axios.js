// src/utils/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL:  'http://localhost:3030/api',
  withCredentials: true
});

api.interceptors.response.use(
  response => response,
  error => {
    // אם השגיאה היא 401 ואין טוקן, לא נציג שגיאה
    if (error.response?.status === 401 && !document.cookie.includes('accessToken')) {
      return Promise.resolve({ data: { user: null } });
    }
    return Promise.reject(error);
  }
);

export default api;