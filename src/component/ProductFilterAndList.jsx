import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useProductinfo from "../utilis/useProductinfo";
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Star as StarIcon, Add as AddIcon } from '@mui/icons-material';

const ProductFilterAndList = () => {
    const { category } = useParams();
    const [filterCategory, setFilterCategory] = useState(category || "All");
    const { data, error, loading } = useProductinfo("https://dummyjson.com/products");

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

    return (
        <div className="mt-2 mb-4 px-4 mx-auto w-[85%]">
            <Link to="/" className="flex items-center mb-4 text-blue-500 hover:text-blue-700">
                <IconButton aria-label="back to home">
                    <ArrowBackIcon />
                </IconButton>
                <span className="ml-2 text-lg">Home</span>
            </Link>
            <div className="flex justify-center items-center border shadow-md bg-white text-black py-2 mb-4">
                <div className="flex gap-2">
                    <h1 className="font-extrabold text-center">Filter</h1>
                    <select
                        name="categoryFilter"
                        id="categoryFilter"
                        className="bg-white border outline-none rounded-sm"
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
                {filteredProducts.map((product) => (
                    <Link to={`/ProductDetailsPage/${product.id}`} key={product.id} className="block">
                        <div className="relative border border-gray-200 duration-300 rounded-[15px] overflow-hidden p-5 bg-white shadow-lg hover:shadow-2xl transition-shadow ease-in-out transform hover:scale-105">
                            <div className="relative flex justify-center">
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="w-[75%] md:w-full object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <span className="text-[#adadad] text-[12px]">{product.category}</span>
                                <h3 className="text-[#253d4e] text-[16px] font-bold leading-5 my-2">
                                    {product.title}
                                </h3>
                                <div className="flex gap-1 items-center">
                                    <div className="flex">
                                        {[...Array(5)].map((_, index) => (
                                            <StarIcon key={index} className={`w-4 h-4 ${index < product.rating ? "text-yellow-500" : "text-gray-400"}`} />
                                        ))}
                                    </div>
                                    <span>{product.rating}</span>
                                </div>
                                <h6 className="font-medium my-3">
                                    <span className="text-[#b6b6b6]">By </span>
                                    <Link className="text-primary" to="/">jahid hasan</Link>
                                </h6>
                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex gap-x-3">
                                        <h5 className="text-primary text-[18px] font-bold underline">
                                            <span>{convertToINR(product.price)}</span>
                                        </h5>
                                        {product.originalPrice && (
                                            <h5 className="text-gray-300 line-through text-[15px] font-bold decoration-2">
                                                <span>{convertToINR(product.originalPrice)}</span>
                                            </h5>
                                        )}
                                    </div>
                                    <button className="text-primary px-[10px] py-1 gap-1 rounded flex bg-primary/20">
                                        <AddIcon className="w-4 h-4" />
                                        Add
                                    </button>
                                </div>
                            </div>
                            <div className="absolute top-0 left-0 z-10">
                                <div className="bg-primary px-5 py-2 text-white font-semibold text-[12px] rounded-br-2xl">
                                    {product.discount}%
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 z-10">
                                <div className="bg-primary px-5 py-2 text-white font-semibold text-[12px] rounded-bl-2xl">
                                    {product.discount}%
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProductFilterAndList;
