import React, { createContext, useContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const isInCart = (id) => {
    return cartItems.some(item => item.id === id);
  };

  const increaseQuantity = (id) => {
    setCartItems((prevItems) => {
      return prevItems.map(item =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      );
    });
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getQuantity = (id) => {
    const item = cartItems.find(item => item.id === id);
    return item ? item.quantity || 0 : 0;
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, isInCart, getQuantity, increaseQuantity, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
