// src/Routing.jsx
import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import { About, Cart, ContactUs, Dashboard, Home, PageNotFound, Products } from "./components";
import Login from './components/Pages/Login/Login';
import Register from './components/Pages/Register/Register';
import { useAuth } from './Contexts/AuthContext';

function Routing() {
  const { user, isAdmin } = useAuth();

  return (
    <div className="main">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />

        {/* Protected Routes */}
        <Route 
          path="/products" 
          element={user ? <Products /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/Cart" 
          element={user ? <Cart /> : <Navigate to="/login" replace />} 
        />

        {/* Admin Only */}
        <Route 
          path="/Dashboard" 
          element={isAdmin ? <Dashboard /> : <Navigate to="/" replace />} 
        />

        {/* 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default Routing;