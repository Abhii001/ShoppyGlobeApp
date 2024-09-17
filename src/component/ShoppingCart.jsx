import React, { useState } from 'react';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Basic Tee',
      size: 'Large',
      color: 'Sienna',
      price: 32.0,
      quantity: 1,
      image: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg',
      inStock: true,
      shippingTime: 'In stock',
    },
    {
      id: 2,
      name: 'Basic Tee',
      size: 'Large',
      color: 'Black',
      price: 32.0,
      quantity: 1,
      image: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg',
      inStock: false,
      shippingTime: 'Ships in 3–4 weeks',
    },
    {
      id: 3,
      name: 'Nomad Tumbler',
      color: 'White',
      price: 35.0,
      quantity: 1,
      image: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg',
      inStock: true,
      shippingTime: 'In stock',
    },
  ]);

  const handleRemove = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(
      cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const shippingEstimate = 5.0;
  const taxEstimate = 8.32;
  const orderTotal = calculateSubtotal() + shippingEstimate + taxEstimate;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold">Shopping Cart</h1>
      <form className="mt-8">
        <section aria-labelledby="cart-heading">
          <h2 id="cart-heading" className="sr-only">Items in your shopping cart</h2>
          <ul className="space-y-4">
            {cartItems.map(item => (
              <li key={item.id} className="flex items-center space-x-4">
                <div className="w-24 h-24">
                  <img src={item.image} alt={`Front of ${item.name} in ${item.color}`} className="w-full h-full object-center object-cover"/>
                </div>
                <div className="flex-1 flex flex-col space-y-1">
                  <h3 className="text-lg font-semibold">
                    <a href="#" className="text-gray-900">{item.name}</a>
                  </h3>
                  <p className="text-sm text-gray-500">{item.color}</p>
                  <p className="text-sm text-gray-500">{item.size}</p>
                  <p className="text-sm font-medium text-gray-900">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <label htmlFor={`quantity-${item.id}`} className="sr-only">Quantity, {item.name}</label>
                  <select
                    id={`quantity-${item.id}`}
                    name={`quantity-${item.id}`}
                    className="max-w-full rounded-md border-gray-300"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  >
                    {[...Array(8).keys()].map(i => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => handleRemove(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
                <p className="text-sm text-gray-500">{item.shippingTime}</p>
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="summary-heading" className="mt-8">
          <h2 id="summary-heading" className="text-lg font-bold">Order Summary</h2>
          <dl className="space-y-4">
            <div className="flex justify-between">
              <dt className="text-sm font-medium text-gray-700">Subtotal</dt>
              <dd className="text-sm font-medium text-gray-900">${calculateSubtotal().toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-700">
                Shipping estimate
              </dt>
              <dd className="text-sm font-medium text-gray-900">${shippingEstimate.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-700">
                Tax estimate
              </dt>
              <dd className="text-sm font-medium text-gray-900">${taxEstimate.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm font-medium text-gray-900">Order total</dt>
              <dd className="text-sm font-medium text-gray-900">${orderTotal.toFixed(2)}</dd>
            </div>
          </dl>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-md py-2 font-medium hover:bg-blue-700"
            >
              Checkout
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default ShoppingCart;
