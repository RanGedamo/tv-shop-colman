// CartContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import PropTypes from "prop-types";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // Load initial cart data
  useEffect(() => {
    const loadCart = () => {
      const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItems(savedCart);
      updateCartStats(savedCart);
    };
    loadCart();
  }, []);

  // Update cart statistics
  const updateCartStats = useCallback((items) => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCartCount(count);
    setCartTotal(total);
  }, []);

  // Add to cart
  const addToCart = useCallback((product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      let newItems;
      
      if (existingItem) {
        newItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...prevItems, { ...product, quantity: 1 }];
      }
      
      localStorage.setItem('cart', JSON.stringify(newItems));
      updateCartStats(newItems);
      return newItems;
    });
  }, [updateCartStats]);

  // Remove from cart
  const removeFromCart = useCallback((productId) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(newItems));
      updateCartStats(newItems);
      return newItems;
    });
  }, [updateCartStats]);

  // Update quantity
  const updateQuantity = useCallback((productId, newQuantity) => {
    setCartItems(prevItems => {
      const newItems = prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, newQuantity) }
          : item
      ).filter(item => item.quantity > 0);
      
      localStorage.setItem('cart', JSON.stringify(newItems));
      updateCartStats(newItems);
      return newItems;
    });
  }, [updateCartStats]);

  // Clear cart
  const clearCart = useCallback(() => {
    setCartItems([]);
    localStorage.removeItem('cart');
    updateCartStats([]);
  }, [updateCartStats]);

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
