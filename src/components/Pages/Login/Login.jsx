import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Contexts/AuthContext';
import "./Login.css";



const Login = () => {
  // const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
const navigate = useNavigate();
  // בדיקה אם המשתמש כבר מחובר

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
      // console.log(error);
      console.log(error.message);
      
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
    <div className="login-container">
  <h2 className="login-title">התחברות</h2>
  
  {errors.general && (
    <div className="error-message">
      {errors.general}
    </div>
  )}
  
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label className="form-label">אימייל</label>
      <input 
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required={true}
        className={`form-input ${errors.email ? 'error' : ''}`}
      />
      {errors.email && <p className="field-error">{errors.email}</p>}
    </div>
    
    <div className="form-group">
      <label className="form-label">סיסמה</label>
      <input 
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required={true}
        className={`form-input ${errors.password ? 'error' : ''}`}
      />
      {errors.password && <p className="field-error">{errors.password}</p>}
    </div>
    
    <button 
      type="submit" 
      disabled={loading}
      className="submit-button"
    >
      {loading ? 'מתחבר...' : 'התחבר'}
    </button>
  </form>
</div>
  );
};

export default Login;