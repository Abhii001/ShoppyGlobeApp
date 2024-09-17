import { useMemo } from 'react';
import useProductinfo from "../utilis/useProductinfo";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Topproduct() {
    const { data, error, loading } = useProductinfo("https://dummyjson.com/products");

    // Memoize unique categories to avoid recalculating on every render
    const uniqueCategories = useMemo(() => {
        if (data && data.products) {
            const categories = data.products.map((product) => product.category);
            return [...new Set(categories)];
        }
        return [];
    }, [data]);

    if (loading) return <p className="text-center mt-4">Loading...</p>;
    if (error) return <p className="text-center mt-4 text-red-500">Error: {error.message}</p>;

    return (
        <div className="max-w-8xl mx-auto px-4 2xl:px-0 mt-10">
            <div className="flex justify-between w-[90%] m-auto p-6">
                <div className="flex flex-col md:flex-row gap-8 justify-start md:items-center">
                    <h2 className="text-[#253d4e] font-bold text-[32px] leading-[30px]">
                        Featured Categories
                    </h2>
                    <ul className="flex gap-4 flex-wrap">
                        {uniqueCategories.map((category) => (
                            <li key={category}>
                                <Link
                                    className="text-[#253d4e] font-semibold text-[15px] transition duration-300 hover:text-primary hover:-translate-y-1 block"
                                    to={`/category/${category}`}
                                >
                                    {category}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="hidden lg:flex gap-4">
                    <button
                        aria-label="Previous"
                        className="w-10 h-10 p-auto rounded-full text-[#253d4e] hover:text-white bg-gray-200 hover:bg-primary duration-300"
                    >
                        <ArrowBackIosNewIcon className="w-full h-full" />
                    </button>
                    <button
                        aria-label="Next"
                        className="w-10 h-10 p-auto rounded-full text-[#253d4e] hover:text-white bg-gray-200 hover:bg-primary duration-300"
                    >
                        <ArrowForwardIosIcon className="w-full h-full" />
                    </button>
                </div>
            </div>

            <div className="flex justify-center flex-wrap items-center w-[90%] m-auto mb-4">
                {data && data.products && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
                        {uniqueCategories.map((category) => {
                            // Find the first product for the category
                            const product = data.products.find((product) => product.category === category);
                            return product ? (
                                <Link
                                    key={category}
                                    to={`/category/${category}`}
                                    className="cat_card py-5 rounded-[12px] bg-gray-100 hover:bg-gray-200 transition-shadow duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-2xl"
                                    style={{ background: "#f2fce4" }}
                                >
                                    <div className="mb-2 cat_card_img">
                                        <div className="flex justify-center">
                                            <img
                                                className="w-[60%]"
                                                src={product.thumbnail}
                                                alt={`${category} thumbnail`}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-center block text-[#253d4e] font-bold">{category}</h3>
                                        <span className="block text-center text-[#7e7e7e] text-[16px]">
                                            {product.stock || 'N/A'} items
                                        </span>
                                    </div>
                                </Link>
                            ) : null;
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Topproduct;
