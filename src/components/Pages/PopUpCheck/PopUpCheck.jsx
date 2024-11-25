import React, { useState, useEffect } from 'react';
import './PopUpCheck.css';
import { useNavigate } from 'react-router-dom';

const PopUpCheck = ({ children }) => {
  const [userDecision, setUserDecision] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate(); // שימוש ב-useNavigate

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const isUserLoggedIn = () => {
    return false; // בדיקה לדוגמה
  };

  const handlePopupDecision = (decision) => {
    setIsVisible(false);
    setTimeout(() => {
      setUserDecision(decision);
      if (decision) {
        navigate('/login'); // ניווט לעמוד ההתחברות
      } else {
        navigate('/products'); // ניווט לעמוד המוצר
      }
    }, 300);
  };

  if (isUserLoggedIn() || userDecision === false) {
    return children;
  }

  return (
    <>
      <div className="page-content disabled">
        {children}
      </div>
      
      <div className={`popup-overlay ${isVisible ? 'visible' : ''}`}>
        {/* רקע הפופאפ: לחיצה עליו תפעיל את handlePopupDecision */}
        <div className="popup-backdrop" onClick={() => handlePopupDecision(false)} />
        
        <div className={`popup-container ${isVisible ? 'visible' : ''}`}>
          <div className="decorative-circle top" />
          <div className="decorative-circle bottom" />
          
          <div className="popup-content">
            <div className="popup-icon">
              <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M12 15v2m0 0v2m0-2h2m-2 0H10m5-7V6a3 3 0 00-3-3H7a3 3 0 00-3 3v7m14 0v2a3 3 0 01-3 3H7a3 3 0 01-3-3v-2m14 0h-3m-9 0h3" />
              </svg>
            </div>

            <h2 className="popup-title">עליך להתחבר כדי להמשיך</h2>
            
            <p className="popup-text">
              על מנת להמשיך בתהליך הרכישה, יש להתחבר תחילה לחשבונך
            </p>
            
            <div className="popup-buttons">
              <button
                onClick={() => handlePopupDecision(true)}
                className="button primary"
              >
                התחברות
              </button>
              
              <button
                onClick={() => handlePopupDecision(false)}
                className="button secondary"
              >
                ביטול
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopUpCheck;
