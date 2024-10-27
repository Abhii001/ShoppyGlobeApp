import React from 'react';
import { useCart } from '../utilis/CartContext';
import { ArrowBack, Add, Remove, Delete } from '@mui/icons-material'; // Import icons
import { Link } from 'react-router-dom';

const ShoppingCart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  // Prevent quantity from going below 1 inside updateQuantity function
  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1
    updateQuantity(itemId, newQuantity);
  };

  const calculateSubtotal = () =>
    cartItems?.reduce((total, item) => total + item.price * item.quantity, 0);

  const shippingEstimate = 5.0; // in USD
  const taxEstimate = 8.32; // in USD

  const convertToINR = (amount) => (amount * 83).toFixed(2); // Assuming 1 USD = 83 INR

  const subtotal = calculateSubtotal();
  const orderTotal = subtotal + shippingEstimate + taxEstimate;

  return (
    <div className="container m-4 p-6 mx-auto px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="py-4">
        <button className="flex items-center text-blue-500 hover:text-blue-700">
          <Link to="/">
            <ArrowBack className="w-6 h-6" />
            <span className="text-lg ml-2">Back to Home</span>
          </Link>
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-10">Cart Items</h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="col-span-2">
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <ul className="space-y-6">
              {cartItems?.length === 0 ? (
                <li className="text-gray-500">Your cart is empty</li>
              ) : (
                cartItems?.map((item) => (
                  <li key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="w-full sm:w-40 h-40">
                      <img
                        src={item.thumbnail}
                        alt={`Front of ${item.title}`}
                        className="w-full h-full rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col space-y-2">
                      <h2 className="text-lg font-bold text-gray-900">{item.title}</h2>
                      <p className="text-sm text-gray-500">{item.color}</p>
                      <p className="text-sm text-gray-500">{item.size}</p>
                      <p className="text-base font-bold text-gray-900">
                        ₹{convertToINR(item.price).toLocaleString()}
                      </p>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-full bg-gray-100 hover:bg-green-600 hover:text-white transition"
                          disabled={item.quantity === 1}
                        >
                          <Remove fontSize="small" />
                        </button>
                        <input
                          className="h-8 w-12 text-center border border-gray-300 outline-none"
                          type="number"
                          min="1"
                          readOnly
                          value={item.quantity}
                        />
                        <button
                          type="button"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-full bg-green-600 text-white hover:bg-green-700 transition"
                        >
                          <Add fontSize="small" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="ml-4 p-1 rounded-full bg-red-500 text-white hover:bg-red-700 transition"
                        >
                          <Delete fontSize="small" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500">{item.shippingTime}</p>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 h-full">
          <div className="mb-4">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">₹{convertToINR(subtotal).toLocaleString()}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700">Shipping estimate</p>
            <p className="text-gray-700">₹{convertToINR(shippingEstimate).toLocaleString()}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700">Tax estimate</p>
            <p className="text-gray-700">₹{convertToINR(taxEstimate).toLocaleString()}</p>
          </div>
          <hr className="my-4" />
          <div className="mb-4">
            <p className="text-lg font-bold">Order total</p>
            <p className="text-lg font-bold">₹{convertToINR(orderTotal).toLocaleString()}</p>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-medium py-2 rounded-md hover:bg-green-700 transition"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
