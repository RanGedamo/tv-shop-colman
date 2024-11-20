import React, { createContext, useState, useEffect } from "react";

// יצירת ה-Context
export const CartContext = createContext();

// ספק ה-Context
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // טען את העגלה מ-localStorage כשנטען
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    // הוסף quantity=1 לכל פריט אם הוא חסר
    const updatedCart = storedCart.map((item) => ({
      ...item,
      quantity: item.quantity ? item.quantity : 1,
    }));
    setCart(updatedCart);
  }, []);

  // עדכן את ה-localStorage כשעגלה משתנה
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // הוספת מוצר לעגלה
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // הגדלת הכמות אם המוצר כבר קיים בעגלה
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // הוספת המוצר עם כמות 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // הסרת מוצר מהעגלה
  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === id);
      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          // הקטנת הכמות אם יש יותר מפריט אחד
          return prevCart.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        } else {
          // הסרת הפריט אם הכמות היא 1
          return prevCart.filter((item) => item.id !== id);
        }
      }
      return prevCart;
    });
  };

  // ניקוי העגלה (אופציונלי)
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
