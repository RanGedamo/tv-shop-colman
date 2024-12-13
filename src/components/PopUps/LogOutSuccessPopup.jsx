import React, { useState, useEffect  } from "react";

import { UserX ,LogOut} from "lucide-react";

const LogOutSuccessPopup = ({ userName }) => {
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
        {/* <Lock size={64} className="mx-auto text-green-500 mb-4" /> */}
        <UserX size={64} className="mx-auto text-red-500 mb-4" />
        {/* <LogOut size={64} className="mx-auto text-green-500 mb-4" /> */}
        <h2 className="text-2xl font-bold mb-4">Thank you for visiting!</h2>
        <p className="text-gray-600 mb-4">
          Your details are securely saved and protected.
        </p>
        <p className="text-sm text-gray-500">
          You will be redirected to the homepage in 5 seconds...
        </p>
      </div>
    </div>
  );
};

export default LogOutSuccessPopup;
