// src/components/Pages/Profile/Profile.jsx
import React, { useState } from 'react';
import { useAuth } from '../../../Contexts/AuthContext';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('details');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' }); // הודעות למשתמש

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await updateUser(formData);
      setMessage({ type: 'success', text: 'הפרטים עודכנו בהצלחה!' });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'שגיאה בעדכון הפרטים'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return setMessage({ type: 'error', text: 'הסיסמאות אינן תואמות' });
    }

    setLoading(true);
    try {
      await updateUser({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      setMessage({ type: 'success', text: 'הסיסמה שונתה בהצלחה!' });
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'שגיאה בשינוי הסיסמה'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">פרופיל משתמש</h2>

      <div className="mb-6 border-b">
        <button
          className={`mr-4 py-2 ${activeTab === 'details' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('details')}
        >
          פרטים אישיים
        </button>
        <button
          className={`py-2 ${activeTab === 'password' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('password')}
        >
          שינוי סיסמה
        </button>
      </div>

      {/* הודעה למשתמש */}
      {message.text && (
        <div
          className={`p-4 mb-4 rounded ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      {activeTab === 'details' ? (
        <form onSubmit={handleUpdateProfile}>
          <div className="mb-4">
            <label className="block mb-2">שם פרטי</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">שם משפחה</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">אימייל</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            {loading ? 'שומר...' : 'עדכן פרטים'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleChangePassword}>
          <div className="mb-4">
            <label className="block mb-2">סיסמה נוכחית</label>
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">סיסמה חדשה</label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">אשר סיסמה חדשה</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            {loading ? 'שומר...' : 'שנה סיסמה'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;
