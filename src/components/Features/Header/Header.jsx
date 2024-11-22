// src/components/Features/Header/Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Contexts/AuthContext";
import "./Header.css";

function Header() {
  const { user, logout } = useAuth();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // נדפיס את המשתמש לקונסול כדי לוודא שהאותנטיקציה עובדת
  console.log("Current user:", user);

  return (
    <div className="header">
      {/* Top Nav */}
      <nav className="navbar navbar-expand-lg bg-dark navbar-light d-none d-lg-block" id="templatemo_nav_top">
        <div className="container text-light">
          <div className="w-100 d-flex justify-content-between">
            <div>
              <i className="fa fa-envelope mx-2"></i>
              <a className="navbar-sm-brand text-light text-decoration-none" href="mailto:info@company.com">
                info@company.com
              </a>
              <i className="fa fa-phone mx-2"></i>
              <a className="navbar-sm-brand text-light text-decoration-none" href="tel:010-020-0340">
                010-020-0340
              </a>
            </div>
            <div>
              <a className="text-light" href="https://fb.com/templatemo" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f fa-sm fa-fw me-2"></i>
              </a>
              <a className="text-light" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram fa-sm fa-fw me-2"></i>
              </a>
              <a className="text-light" href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter fa-sm fa-fw me-2"></i>
              </a>
              <a className="text-light" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin fa-sm fa-fw"></i>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Nav */}
      <nav className="navbar navbar-expand-lg navbar-light shadow">
        <div className="container d-flex justify-content-between align-items-center">
          <Link className="navbar-brand text-success logo h1 align-self-center" to="/">
            Zay
          </Link>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#templatemo_main_nav"
            aria-controls="templatemo_main_nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="align-self-center collapse navbar-collapse flex-fill d-lg-flex justify-content-lg-between" id="templatemo_main_nav">
            <div className="flex-fill">
              <ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">About</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/products">Products</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contactus">ContactUs</Link>
                </li>
                {user?.isAdmin && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                  </li>
                )}
              </ul>
            </div>
            
            <div className="navbar align-self-center d-flex">
              {/* Cart Icon */}
              <Link to="/cart" className="nav-icon position-relative text-decoration-none">
                <i className="fa fa-fw fa-cart-arrow-down text-dark mr-1"></i>
              </Link>

              {/* User Menu */}
              {user ? (
                <div className="user-icon position-relative">
                  <button
                    className="nav-icon position-relative text-decoration-none btn btn-link"
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    aria-label="Toggle User Menu"
                  >
                    <i className="fa fa-fw fa-user text-dark mr-3"></i>
                    {/* הצגת שם המשתמש אם קיים */}
                    <span className="ms-1">{user.firstName}</span>
                  </button>
                  {isUserDropdownOpen && (
                    <div className="user-dropdown">
                      <ul className="user-options">
                        <li>
                          <Link to="/profile" onClick={() => setIsUserDropdownOpen(false)}>
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link to="/orders" onClick={() => setIsUserDropdownOpen(false)}>
                            Orders
                          </Link>
                        </li>
                        <li>
                          <button 
                            onClick={() => {
                              logout();
                              setIsUserDropdownOpen(false);
                            }} 
                            className="btn btn-link"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="btn btn-outline-primary">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;