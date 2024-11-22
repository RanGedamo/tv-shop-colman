import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // בדיקה אם המשתמש כבר מחובר
  useEffect(() => {
    if (user) {
      const confirmLogout = window.confirm(
        'הינך כבר מחובר למערכת. האם ברצונך להתנתק?'
      );
      if (confirmLogout) {
        logout();
      } else {
        navigate('/');
      }
    }
  }, [user, navigate, logout]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // מחיקת שגיאה ספציפית בעת הקלדה
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    
    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (error) {

      if (error.response && error.response.data) {
        setErrors({
          general: error.response.data.message
        });
      } else if (error.message) {
        setErrors({
          general: error.message
        });
      } else {
        setErrors({
          general: 'שגיאה לא ידועה התרחשה'
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">התחברות</h2>
      
      {errors.general && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {errors.general}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">אימייל</label>
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        
        <div className="mb-4">
          <label className="block mb-2">סיסמה</label>
          <input 
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : ''}`}
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          {loading ? 'מתחבר...' : 'התחבר'}
        </button>
      </form>
    </div>
  );
};

export default Login;