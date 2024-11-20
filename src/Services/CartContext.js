import React, { createContext, useState, useEffect } from "react";

// יצירת ה-Context
export const CartContext = createContext();

// ספק ה-Context
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // טען את העגלה מ-localStorage כשנטען
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // עדכן את ה-localStorage כשעגלה משתנה
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
