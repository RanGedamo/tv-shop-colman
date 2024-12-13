// src/Routing.jsx
import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import { About, AccountSettings, Checkout, ContactUs, Dashboard, Home, Orders, PageNotFound, Products,Profile, Wishlist } from "./components";
import Login from './components/Pages/Login/Login';
import Register from './components/Pages/Register/Register';
import { useAuth } from './Contexts/AuthContext';
// import PopUpCheck from './components/Pages/PopUpCheck/PopUpCheck';


function Routing() {
  const { isAuthenticated ,user} = useAuth();
console.log("user :", user);


  return (
    <div className="main">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/account/orders" element={<Orders />} />
        <Route path="/account/favorites" element={<Wishlist />} />

        {/* Protected Routes */}
        {/* <Route 
          path="/Orders" 
          element={isAuthenticated ? <Orders /> : <PopUpCheck />} 
        /> */}
{/* <Route 
  path="/Cart" 
  element={
    isAuthenticated ? (
      <Cart />
    ) : (
      <PopUpCheck />
    )
  }
/> */}
        <Route 
          path="/account/settings" 
          element={isAuthenticated ? <AccountSettings /> : <Navigate to="/login" />} 
        />

        {/* Admin Route */}
        {/* <Route 
          path="/Dashboard" 
          element={
            isAuthenticated ? (
              user?.isAdmin ? (
                <Dashboard />
              ) : (
                <Navigate to="/" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        /> */}

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default Routing;