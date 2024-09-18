import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useProductinfo from "../utilis/useProductinfo";
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Star as StarIcon, Add as AddIcon, AddCircleOutline as AddCircleOutlineIcon, AddCircle as AddCircleIcon } from '@mui/icons-material';
import { useCart } from '../utilis/CartContext';

const ProductFilterAndList = () => {
    const { category } = useParams();
    const [filterCategory, setFilterCategory] = useState(category || "All");
    const { data, error, loading } = useProductinfo("https://dummyjson.com/products");
    const { addToCart, increaseQuantity, isInCart, getQuantity } = useCart();

    useEffect(() => {
        setFilterCategory(category || "All");
    }, [category]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const conversionRate = 83;

    const convertToINR = (price) => {
        const priceValue = typeof price === 'string'
            ? parseFloat(price.replace(/[^0-9.-]+/g, ""))
            : parseFloat(price);
        return isNaN(priceValue) ? "N/A" : `₹${(priceValue * conversionRate).toFixed(2)}`;
    };

    const filteredProducts = filterCategory === "All"
        ? data?.products || []
        : (data?.products || []).filter(product => product.category === filterCategory);

    const uniqueCategories = data?.products
        ? [...new Set(data.products.map(product => product.category))]
        : [];

    const handleAddToCart = (product) => {
        if (isInCart(product.id)) {
            increaseQuantity(product.id);
        } else {
            addToCart(product);
        }
    };

    return (
        <div className="mt-2 mb-4 px-4 mx-auto w-[85%]">
            <Link to="/" className="flex items-center mb-4 text-blue-500 hover:text-blue-700">
                <IconButton aria-label="back to home">
                    <ArrowBackIcon />
                </IconButton>
                <span className="ml-2 text-lg font-semibold">Home</span>
            </Link>
            <div className="flex justify-center items-center border border-gray-200 rounded-lg shadow-md bg-white text-black py-2 mb-4">
                <div className="flex gap-2">
                    <h1 className="font-extrabold text-lg text-center">Filter</h1>
                    <select
                        name="categoryFilter"
                        id="categoryFilter"
                        className="bg-white border border-gray-300 rounded-md outline-none px-3 py-1"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                    >
                        <option value="All">All</option>
                        {uniqueCategories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => {
                    const inCart = isInCart(product.id);
                    const quantity = getQuantity(product.id);
                    return (
                        <div key={product.id} className="block">
                            <div className="relative border border-gray-200 rounded-lg overflow-hidden p-5 bg-white shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 duration-300">
                                <Link to={`/productdetail/${product.id}`} className="relative flex justify-center mb-4">
                                    <img
                                        src={product.thumbnail}
                                        alt={product.title}
                                        className="w-[75%] md:w-full object-cover rounded-md"
                                    />
                                </Link>
                                <div className="p-4">
                                    <span className="text-gray-500 text-xs">{product.category}</span>
                                    <h3 className="text-gray-800 text-lg font-semibold my-2">
                                        {product.title}
                                    </h3>
                                    <div className="flex gap-1 items-center mb-3">
                                        <div className="flex">
                                            {[...Array(5)].map((_, index) => (
                                                <StarIcon key={index} className={`w-4 h-4 ${index < product.rating ? "text-yellow-500" : "text-gray-400"}`} />
                                            ))}
                                        </div>
                                        <span className="text-gray-600 text-xs ml-2">{product.rating}</span>
                                    </div>
                                    <h6 className="font-medium my-3 text-sm">
                                        <span className="text-gray-500">By </span>
                                        <Link className="text-primary" to="/">jahid hasan</Link>
                                    </h6>
                                    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
                                        <div className="flex gap-x-3 items-center">
                                            <h5 className="text-primary text-lg font-semibold">
                                                <span>{convertToINR(product.price)}</span>
                                            </h5>
                                            {product.originalPrice && (
                                                <h5 className="text-gray-500 line-through text-sm font-medium">
                                                    <span>{convertToINR(product.originalPrice)}</span>
                                                </h5>
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                className={`px-4 py-2 rounded-lg flex items-center gap-2 shadow-md transition duration-300 ease-in-out ${inCart ? 'bg-gray-300 text-gray-600' : 'bg-primary hover:bg-primary-dark hover:shadow-lg'}`}
                                                aria-label={inCart ? "Increase quantity" : "Add to cart"}
                                                onClick={() => handleAddToCart(product)}
                                            >
                                                {inCart ? <AddCircleIcon className="w-4 h-4 text-gray-600" /> : <AddIcon className="w-4 h-4" />}
                                                <span className={`font-semibold ${inCart ? 'text-gray-600' : 'text-black'}`}>
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
                                        <div className="bg-primary px-4 py-2 text-white font-semibold text-xs rounded-br-lg">
                                            {product.discount}%
                                        </div>
                                    </div>
                                )}
                                {product.discount && (
                                    <div className="absolute top-0 right-0 z-10">
                                        <div className="bg-primary px-4 py-2 text-white font-semibold text-xs rounded-bl-lg">
                                            {product.discount}%
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductFilterAndList;
