import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// יצירת ה-Context
export const CartContext = createContext();

// ספק ה-Context
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // טעינה ראשונית של ה-`cart` מ-`localStorage`
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = storedCart.map((item) => ({
      ...item,
      quantity: item.quantity ? item.quantity : 1,
    }));
    setCart(updatedCart);
  }, []);

  // שמירה אוטומטית ב-`localStorage` כאשר ה-`cart` משתנה
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // הוספה לעגלה
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // הסרה מעגלה
  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === id);
      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          return prevCart.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        } else {
          return prevCart.filter((item) => item.id !== id);
        }
      }
      return prevCart;
    });
  };

  // ניקוי עגלה - מתבצע רק כאשר המשתמש מבצע רכישה מוצלחת
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart"); // ניקוי גם ב-`localStorage`
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// הגדרת PropTypes
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
