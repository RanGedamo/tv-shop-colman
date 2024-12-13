import React, { useState, useEffect } from "react";
import {
  User,
  Lock,
  Bell,
  CreditCard,
  ShieldCheck,
  ChevronLeft,
  CheckIcon,
} from "lucide-react";
import { useAuth } from "../../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AccountSettings = () => {
  const { user, updateProfile, changePassword } = useAuth();
  const navigate = useNavigate();

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // Notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  // Active section
  const [activeSection, setActiveSection] = useState("profile");

  // Error and success states
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load user data on component mount
  useEffect(() => {
    if (user?.user) {
      setFirstName(user.user.firstName || "");
      setLastName(user.user.lastName || "");
      setEmail(user.user.email || "");
      setPhone(user.user.phone || "");
    }
  }, [user]);

  // Profile update handler
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await updateProfile({
        firstName,
        lastName,
        phone,
      });
      setSuccess("פרופיל עודכן בהצלחה");
    } catch (err) {
      setError("שגיאה בעדכון הפרופיל. אנא נסה שוב.");
    }
  };

  // Password change handler
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmNewPassword) {
      setError("הסיסמאות החדשות אינן תואמות");
      return;
    }

    try {
      await changePassword(currentPassword, newPassword);
      setSuccess("סיסמה שונתה בהצלחה");
      // Clear password fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      setError("שגיאה בשינוי הסיסמה. אנא בדוק את הסיסמה הנוכחית.");
    }
  };

  // Render section navigation
  const renderSectionNavigation = () => {
    const sections = [
      { key: "profile", label: "פרופיל", icon: <User size={20} /> },
      { key: "security", label: "אבטחה", icon: <Lock size={20} /> },
      { key: "notifications", label: "הודעות", icon: <Bell size={20} /> },
      { key: "payment", label: "תשלומים", icon: <CreditCard size={20} /> },
      { key: "privacy", label: "פרטיות", icon: <ShieldCheck size={20} /> },
    ];

    return (
      <div className="w-64 bg-gray-100 p-4 rounded-lg">
        {sections.map((section) => (
          <button
            key={section.key}
            onClick={() => setActiveSection(section.key)}
            className={`w-full text-right flex items-center p-3 rounded-lg mb-2 ${
              activeSection === section.key
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-200 text-gray-700"
            }`}
          >
            <span className="mr-3">{section.icon}</span>
            {section.label}
          </button>
        ))}
      </div>
    );
  };

  // Render active section content
  const renderSectionContent = () => {
    switch (activeSection) {
      case "profile":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">עדכון פרופיל</h2>
            <form onSubmit={handleProfileUpdate}>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">שם פרטי</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2">שם משפחה</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block mb-2">אימייל</label>
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="w-full px-3 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div className="mt-4">
                <label className="block mb-2">טלפון</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="הזן מספר טלפון"
                />
              </div>
              <button
                type="submit"
                className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                עדכן פרטים
              </button>
            </form>
          </div>
        );

      case "security":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">שינוי סיסמה</h2>
            <form onSubmit={handlePasswordChange}>
              <div className="mb-4">
                <label className="block mb-2">סיסמה נוכחית</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">סיסמה חדשה</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                  minLength="8"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">אימות סיסמה חדשה</label>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                  minLength="8"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                שנה סיסמה
              </button>
            </form>
          </div>
        );

      case "notifications":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">העדפות התראות</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-gray-700">התראות דוא״ל</label>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    checked={emailNotifications}
                    onChange={() => setEmailNotifications(!emailNotifications)}
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-gray-700">התראות SMS</label>
               
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    checked={smsNotifications}
                    onChange={() => setSmsNotifications(!smsNotifications)}
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
                

              </div>
            </div>
            <button
              onClick={() => {
                /* Save notification preferences */
              }}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              שמור העדפות
            </button>
          </div>
        );

      case "payment":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">אמצעי תשלום</h2>
            <p className="text-gray-600 mb-4">לא נוספו אמצעי תשלום</p>
            <button
              onClick={() => {
                /* Add payment method */
              }}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              הוסף אמצעי תשלום
            </button>
          </div>
        );

      case "privacy":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">הגדרות פרטיות</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-gray-700">
                  שיתוף מידע עם צדדים שלישיים
                </label>
                


                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-gray-700">קבלת הצעות שיווקיות</label>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Render error/success messages
  const renderMessages = () => {
    if (error) {
      return (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          {error}
        </div>
      );
    }
    if (success) {
      return (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          {success}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-gray-600 hover:text-blue-600"
        >
          <ChevronLeft size={20} className="mr-2" />
          חזרה
        </button>
        <div className="flex flex-col md:flex-row gap-6">
          {renderSectionNavigation()}
          <div className="flex-1">
            {renderMessages()}
            {renderSectionContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
