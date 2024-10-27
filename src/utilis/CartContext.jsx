import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children, isAuthenticated }) => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items on component mount
  useEffect(() => {
    const fetchCart = async () => {
        if (!isAuthenticated) return; // Exit early if not authenticated

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found. User may not be authenticated.');
                return;
            }

            const response = await axios.get('http://localhost:2100/api/cart', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });

            console.log('Cart data:', response.data);
            setCartItems(response.data.items); // Assuming response.data.items contains cart items
        } catch (error) {
            console.error('Error fetching cart:', error);
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized access. Redirecting to login...');
                // Handle redirection or state update for unauthorized access
            }
        }
    };

    fetchCart();
}, [isAuthenticated]); 


  const addToCart = async (product) => {
    try {
      const response = await axios.post('http://localhost:2100/api/cart', {
        productId: product.id,
        quantity: 1,
      });
      setCartItems(response.data.items);
      console.log("Item added to cart:", response.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Remove a product from the cart
  const removeFromCart = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:2100/api/cart/${id}`);
      setCartItems(response.data.items);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const isInCart = (productId) => {
    return cartItems?.some(item => item.productId === productId) || false;
  };

  
  const increaseQuantity = async (id) => {
    const item = cartItems.find(item => item.productId === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      const response = await axios.put(`http://localhost:2100/api/cart/${productId}`, { quantity: newQuantity });
      setCartItems(response.data.items); 
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    }
  };

  
  const getQuantity = (productId) => {
    const item = cartItems?.find(item => item.productId === productId);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, isInCart, getQuantity, increaseQuantity, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
