import React from 'react';
import { useCart } from '../utilis/CartContext';
import { ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const ShoppingCart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const shippingEstimate = 5.0; // in USD
  const taxEstimate = 8.32; // in USD

  const convertToINR = (amount) => (amount * 83).toFixed(2);

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
              {cartItems.length === 0 ? (
                <li className="text-gray-500">Your cart is empty</li>
              ) : (
                cartItems.map(item => (
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
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-black bg-gray-100 font-bold py-1 px-3.5 rounded-l hover:bg-green-600 hover:text-white transition"
                        >
                          -
                        </button>
                        <input
                          className="h-8 w-12 text-center border-l border-r border-gray-300 outline-none"
                          type="number"
                          min="1"
                          readOnly
                          value={item.quantity}
                        />
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-white bg-green-600 font-bold py-1 px-3.5 rounded-r hover:bg-green-700 transition"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        Remove
                      </button>
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
