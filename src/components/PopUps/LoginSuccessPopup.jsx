import React, { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";

const LoginSuccessPopup = ({ userName }) => {
  const [isVisible, setIsVisible] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      window.location.href = "/";
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full">
        <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
        <h2 className="text-2xl font-bold mb-4">
          You have successfully logged in!
        </h2>
        <p className="text-gray-600 mb-4">Welcome, {userName}!</p>
        <p className="text-sm text-gray-500">
          You will be redirected to the homepage in 5 seconds...
        </p>
      </div>
    </div>
  );
};

export default LoginSuccessPopup;
