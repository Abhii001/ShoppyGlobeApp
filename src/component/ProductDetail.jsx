import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    ShoppingCart as ShoppingCartIcon,
    AddShoppingCart as AddShoppingCartIcon,
    FavoriteBorder as FavoriteBorderIcon,
} from '@mui/icons-material';
import { useCart } from '../utilis/CartContext';

const convertToINR = (amountInUSD) => {
    const conversionRate = 82;
    return (amountInUSD * conversionRate).toFixed(2);
};

const ProductDetail = ({ products }) => {
    const { productId } = useParams(); // Hook 1
    const navigate = useNavigate(); // Hook 2
    const { addToCart, increaseQuantity, isInCart, getQuantity } = useCart(); // Hook 3

    // Find the product based on the productId from the URL params
    const product = products.find((p) => p.id === parseInt(productId, 10));

    // Handle case when the product is not found
    if (!product) return <div>Product not found</div>;

    const images = product.images || [];
    const sizes = product.sizes || [];
    const tags = product.tags || [];
    const reviews = product.reviews || [];

    const inCart = isInCart(product.id);
    const quantity = getQuantity(product.id);

    // Function to handle adding the product to the cart
    const handleAddToCart = (e) => {
        e.stopPropagation();
        if (inCart) {
            increaseQuantity(product.id);
        } else {
            addToCart(product);
        }
    };

    // Function to navigate to the Shopping Cart page
    const handleGoToCart = () => {
        navigate('/ShoppingCart');
    };

    return (
        <div className="container mx-auto px-4 sm:px-8 py-8">
            <Button
                onClick={() => navigate(-1)}
                startIcon={<ArrowBackIcon />}
                className="text-blue-500 hover:text-blue-700 mb-6"
                variant="text"
            >
                Back
            </Button>

            <div className="flex flex-col xl:flex-row gap-14">
                {/* Product Images */}
                <div className="flex-1 max-w-full md:max-w-xl">
                    <div className="border rounded-lg border-gray-200 p-1 md:p-6">
                        <img
                            src={images[0] || 'default-image.jpg'}
                            alt="Product"
                            className="w-full h-full object-cover rounded"
                        />
                    </div>
                    <div className="mt-5 flex gap-2">
                        {images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-16 h-16 object-cover rounded cursor-pointer"
                                onClick={() => console.log('Image clicked', img)}
                            />
                        ))}
                    </div>
                </div>

                {/* Product Details */}
                <div className="flex-1 space-y-8">
                    <span className="text-red-500 bg-red-100 font-bold px-3 py-1.5 rounded">Sale Off</span>
                    <h3 className="text-2xl sm:text-4xl font-bold text-primary">{product.title}</h3>
                    <div className="flex items-center gap-2">
                        <div className="flex">
                            {[...Array(5)].map((_, index) => (
                                <svg key={index} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-500" width="15">
                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-sm text-gray-400 font-medium">({product.reviews?.length || 0} Reviews)</span>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-2 flex-wrap">
                        <h2 className="text-3xl sm:text-5xl text-primary font-bold">₹{convertToINR(product.price)}</h2>
                        <div>
                            <h4>
                                <span className="line-through text-xl sm:text-2xl font-bold text-gray-300">₹{convertToINR(product.originalPrice || '0.00')}</span>
                                <sup className="text-red-500 font-semibold -top-3 ml-1">{product.discount || 0}% Off</sup>
                            </h4>
                        </div>
                    </div>
                    <p className="text-gray-700">{product.description || 'No description available'}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <span className="text-gray-400 font-bold text-sm">Size / Weight:</span>
                        <div className="flex items-center gap-1 flex-wrap">
                            {sizes.map((size, index) => (
                                <Button
                                    key={index}
                                    className={`px-2 py-1.5 rounded text-sm font-medium duration-300 ${size.selected ? 'bg-primary text-white' : 'text-gray-400 hover:text-white hover:bg-primary'}`}
                                >
                                    {size.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-2 flex-wrap">
                        <Button
                            startIcon={<AddShoppingCartIcon />}
                            className={`px-4 py-2 rounded-lg flex items-center gap-2 shadow-md transition duration-300 ease-in-out ${inCart ? 'bg-gray-300 text-gray-600' : 'bg-primary hover:bg-green-600 hover:text-white hover:shadow-lg'}`}
                            aria-label={inCart ? "Increase quantity" : "Add to cart"}
                            onClick={handleAddToCart}
                        >
                            {inCart ? `Added (${quantity})` : 'Add to Cart'}
                        </Button>
                        <Button
                            onClick={handleGoToCart}
                            className="px-3.5 py-3.5 rounded hover:bg-green-600 hover:text-white text-gray-400 border border-gray-200 duration-300 hover:-translate-y-1"
                        >
                            <ShoppingCartIcon />
                        </Button>
                        <Button
                            className="px-3.5 py-3.5 rounded hover:bg-green-600 hover:text-white text-gray-400 border border-gray-200 duration-300 hover:-translate-y-1"
                        >
                            <FavoriteBorderIcon />
                        </Button>
                    </div>
                    <div>
                        <ul className="text-sm font-semibold grid grid-cols-2 gap-2">
                            <li className="flex items-center gap-1">
                                <span className="text-gray-400 basis-14 sm:basis-12">Type:</span>
                                <span className="text-primary">{product.type || 'N/A'}</span>
                            </li>
                            <li className="flex items-center gap-1">
                                <span className="text-gray-400 basis-14 sm:basis-12">SKU:</span>
                                <span className="text-primary">{product.sku || 'N/A'}</span>
                            </li>
                            <li className="flex items-center gap-1">
                                <span className="text-gray-400 basis-14 sm:basis-12">MFG:</span>
                                <span className="text-primary">{product.mfg || 'N/A'}</span>
                            </li>
                            <li className="flex items-center gap-1">
                                <span className="text-gray-400 basis-14 sm:basis-12">Tags:</span>
                                <span className="text-primary">
                                    {tags.map((tag, index) => (
                                        <React.Fragment key={index}>
                                            {index > 0 && ', '}
                                            {tag}
                                        </React.Fragment>
                                    ))}
                                </span>
                            </li>
                        </ul>
                    </div>
                    {/* Render Reviews */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Reviews</h3>
                        {reviews.length === 0 ? (
                            <p>No reviews available.</p>
                        ) : (
                            reviews.map((review, index) => (
                                <div key={index} className="review mb-4 p-4 border border-gray-200 rounded">
                                    <p><strong>{review.reviewer}</strong></p>
                                    <p>{review.comment}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
