import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useProductInfo from "../utilis/useProductinfo";

function SearchBox() {
    const navigate = useNavigate();
    const { data, error, loading } = useProductInfo("https://dummyjson.com/products");
    const [query, setQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        if (query) {
            handleSearch(query);
        } else {
            setFilteredProducts([]);
        }
    }, [query, data]);

    const handleSearch = (query) => {
        if (Array.isArray(data?.products)) {
            const filtered = data.products.filter(product =>
                product.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            console.error('Data is not an array:', data);
            setFilteredProducts([]);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        setShowDropdown(value.length > 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleBlur = () => {
        setTimeout(() => {
            setShowDropdown(false);
        }, 100);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading products.</p>;

    return (
        <div className="relative w-full">
            <form onSubmit={handleSubmit} className="flex items-center w-full">
                <input
                    className="flex-grow py-2 px-3 outline-none"
                    type="text"
                    placeholder="Search for products..."
                    value={query}
                    onChange={handleInputChange}
                    onFocus={() => setShowDropdown(true)}
                    onBlur={handleBlur}
                    aria-live="polite"
                    aria-haspopup="listbox"
                />
                <button
                    className="bg-green-700 text-white font-semibold py-2 px-4 cursor-pointer"
                    type="submit"
                >
                    Search
                </button>
            </form>

            {/* Dropdown for filtered products */}
            {showDropdown && filteredProducts.length > 0 && (
                <ul className="absolute top-20 z-50 bg-slate-100 rounded-md w-[90vw] sm:w-[70%] max-h-80 overflow-y-auto" role="listbox">
                    {filteredProducts.map(product => (
                        <li
                            key={product.id}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                            role="option"
                            aria-selected={query === product.title}
                        >
                            <Link to={`/productdetail/${product.id}`} className="flex items-center">
                                <img src={product.thumbnail} alt={product.title} className="w-12 h-12 object-cover mr-2" />
                                <div>
                                    <h1 className="text-slate-900 text-sm">{product.title}</h1>
                                    <p className="text-xs opacity-45 font-bold italic">{product.brand}</p>
                                </div>
                            </Link>

                        </li>
                    ))}
                </ul>
            )}

            {/* Show a message when no results are found */}
            {showDropdown && filteredProducts.length === 0 && (
                <div className="absolute top-20 z-50 bg-slate-100 rounded-md w-[90vw] sm:w-[70%] p-2">
                    <p className="text-center text-gray-500">No results found</p>
                </div>
            )}
        </div>
    );
}

export default SearchBox;
