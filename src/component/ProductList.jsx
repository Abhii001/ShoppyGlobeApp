import { useState, useEffect } from "react";
import useProductinfo from "../utilis/useProductinfo";
import ProductItems from "./ProductItems";
import { Link } from "react-router-dom";

const ProductList = () => {
    const { data, error, loading } = useProductinfo("https://dummyjson.com/products");
    const [categoriesWithProducts, setCategoriesWithProducts] = useState({});

    useEffect(() => {
        if (data && Array.isArray(data.products)) {
            const categorizedProducts = data.products.reduce((acc, product) => {
                if (!acc[product.category]) {
                    acc[product.category] = [];
                }
                acc[product.category].push(product);
                return acc;
            }, {});

            const filteredCategories = Object.entries(categorizedProducts).reduce((acc, [category, products]) => {
                acc[category] = products.length >= 2 ? products.slice(0, 4) : products;
                return acc;
            }, {});

            setCategoriesWithProducts(filteredCategories);
        }
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const categories = Object.keys(categoriesWithProducts);

    return (
        <div className="w-[85%] mt-2 mb-4 px-4 m-auto">
            <div className="flex flex-col md:flex-row gap-8 justify-start md:justify-between md:items-center">
                <h2 className="text-[#253d4e] font-bold text-2xl leading-tight">Popular Products</h2>
                <ul className="flex gap-4 flex-wrap">
                    {categories.map((category) => (
                        <li key={category}>
                            <Link 
                                to={`/category/${category}`} 
                                className="text-[#253d4e] font-semibold text-sm cursor-pointer hover:text-primary hover:-translate-y-1 block transition duration-300"
                            >
                                {category}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            {categories.map((category) => (
                <div key={category} className="my-6">
                    <h2 className="text-lg font-semibold mb-2">{category}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {categoriesWithProducts[category].map(product => (
                            <ProductItems key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
