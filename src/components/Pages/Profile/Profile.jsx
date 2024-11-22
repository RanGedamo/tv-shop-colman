// // src/components/Pages/Profile/Profile.jsx
// import React, { useState } from 'react';
// import { useAuth } from '../../../Contexts/AuthContext';
// import { toast } from 'react-toastify';

// const Profile = () => {
//   const { user, updateUser } = useAuth();
//   const [activeTab, setActiveTab] = useState('details');
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: user?.firstName || '',
//     lastName: user?.lastName || '',
//     email: user?.email || ''
//   });
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });

//   const handleUpdateProfile = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await updateUser(formData);
//       toast.success('הפרטים עודכנו בהצלחה!');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'שגיאה בעדכון הפרטים');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChangePassword = async (e) => {
//     e.preventDefault();
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       return toast.error('הסיסמאות אינן תואמות');
//     }

//     setLoading(true);
//     try {
//       await updateUser({ 
//         currentPassword: passwordData.currentPassword,
//         newPassword: passwordData.newPassword 
//       });
//       toast.success('הסיסמה שונתה בהצלחה!');
//       setPasswordData({
//         currentPassword: '',
//         newPassword: '',
//         confirmPassword: ''
//       });
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'שגיאה בשינוי הסיסמה');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow">
//       <h2 className="text-2xl font-bold mb-6">פרופיל משתמש</h2>
      
//       <div className="mb-6 border-b">
//         <button
//           className={`mr-4 py-2 ${activeTab === 'details' ? 'border-b-2 border-blue-500' : ''}`}
//           onClick={() => setActiveTab('details')}
//         >
//           פרטים אישיים
//         </button>
//         <button
//           className={`py-2 ${activeTab === 'password' ? 'border-b-2 border-blue-500' : ''}`}
//           onClick={() => setActiveTab('password')}
//         >
//           שינוי סיסמה
//         </button>
//       </div>

//       {activeTab === 'details' ? (
//         <form onSubmit={handleUpdateProfile}>
//           {/* טופס פרטים אישיים */}
//         </form>
//       ) : (
//         <form onSubmit={handleChangePassword}>
//           {/* טופס שינוי סיסמה */}
//         </form>
//       )}
//     </div>
//   );
// };
// export default Profile;