import React from 'react';
import { Link } from 'react-router-dom';
import { Star as StarIcon, Add as AddIcon, AddCircleOutline as AddCircleOutlineIcon, AddCircle as AddCircleIcon } from '@mui/icons-material';
import { useCart } from '../utilis/CartContext';

function ProductItems({ product }) {
  const { addToCart, increaseQuantity, isInCart, getQuantity } = useCart();
  const inCart = isInCart(product.id);
  const quantity = getQuantity(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (inCart) {
      increaseQuantity(product.id);
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="relative border border-gray-200 rounded-lg overflow-hidden p-5 bg-white shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 duration-300">
      <div className="relative flex justify-center mb-4">
        <img
          src={product.thumbnail || '/path/to/default/image.jpg'}
          alt={product.title || 'Product Image'}
          className="w-[75%] md:w-full object-cover rounded-md"
        />
      </div>
      <div className="p-4">
        <Link to={`/category/${product.category}`} className="text-gray-500 text-xs hover:text-gray-700 transition-colors">
          {product.category}
        </Link>
        <h3 className="text-gray-800 text-xl font-semibold my-2">
          <Link to={`/productdetail/${product.id}`} className="hover:text-primary transition-colors">
            {product.title}
          </Link>
        </h3>
        <div className="flex gap-1 items-center mb-3">
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <StarIcon key={index} className={`w-4 h-4 ${index < product.rating ? "text-yellow-500" : "text-gray-400"}`} />
            ))}
          </div>
          <span className="text-gray-600 text-xs ml-2">{product.rating}</span>
        </div>
        <div className="flex justify-between items-center mb-3">
          <div className="flex gap-x-3 items-center">
            <h5 className="text-primary text-xl font-semibold">
              <span>₹{product.price}</span>
            </h5>
            {product.originalPrice && (
              <h5 className="text-gray-500 line-through text-sm font-medium">
                <span>₹{product.originalPrice}</span>
              </h5>
            )}
          </div>
          <div className="flex items-center gap-x-2">
            <button
              className={`px-4 py-2 rounded-lg flex items-center gap-2 shadow-md transition duration-300 ease-in-out ${inCart ? 'bg-gray-300 text-gray-600' : 'bg-primary hover:bg-primary-dark hover:shadow-lg'}`}
              aria-label={inCart ? "Increase quantity" : "Add to cart"}
              onClick={handleAddToCart}
              disabled={false}
            >
              {inCart ? <AddCircleIcon className="w-4 h-4 text-gray-600" /> : <AddIcon className="w-4 h-4" />}
              <span className={`text-sm font-semibold ${inCart ? 'text-gray-600' : 'text-gray-950'}`}>
                {inCart ? `Added (${quantity})` : 'Add'}
              </span>
            </button>
            <Link 
              to={`/productdetail/${product.id}`} 
              className="bg-primary px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-primary-dark hover:shadow-lg transition duration-300 ease-in-out"
            >
              <AddCircleOutlineIcon className="w-4 h-4" />
              <span className="ml-1 text-sm font-semibold">View</span>
            </Link>
          </div>
        </div>
      </div>
      {product.discount && (
        <div className="absolute top-0 left-0 z-10">
          <div className="bg-primary px-4 py-2 text-white font-semibold text-sm rounded-br-lg">
            {product.discount}%
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductItems;
