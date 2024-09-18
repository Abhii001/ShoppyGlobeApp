import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useProductInfo from "../utilis/useProductinfo";
import { debounce } from "lodash";

function SearchBox() {
    const navigate = useNavigate();
    const { data, error, loading } = useProductInfo("https://dummyjson.com/products");
    const [query, setQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const debouncedSearch = debounce(() => {
            if (query) {
                handleSearch(query);
            } else {
                setFilteredProducts([]);
            }
        }, 300); // 300ms delay
        debouncedSearch();
        return () => debouncedSearch.cancel();
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
        // Clear the input field
        setQuery('');
        setShowDropdown(false);
        setFilteredProducts([]);
    };

    const handleClear = () => {
        setQuery('');
        setShowDropdown(false);
        setFilteredProducts([]);
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
                    aria-live="polite"
                    aria-haspopup="listbox"
                />
                {query && (
                    <button
                        type="button"
                        className="text-gray-500 mx-2"
                        onClick={handleClear}
                    >
                        Clear
                    </button>
                )}
                <button
                    className="bg-green-700 text-white font-semibold py-2 px-4 cursor-pointer"
                    type="submit"
                >
                    Search
                </button>
            </form>

            {/* Dropdown for filtered products */}
            {showDropdown && (
                <div className="absolute top-20 z-50 bg-white rounded-md w-full max-h-80 overflow-y-auto shadow-lg">
                    {loading ? (
                        <p className="text-center py-2">Loading...</p>
                    ) : filteredProducts.length > 0 ? (
                        <ul>
                            {filteredProducts.map(product => (
                                <li
                                    key={product.id}
                                    className="p-3 cursor-pointer hover:bg-gray-100 transition-colors duration-200 ease-in-out"
                                    role="option"
                                    aria-selected={query === product.title}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setQuery(''); // Clear input field
                                        setShowDropdown(false); // Hide dropdown
                                        navigate(`/productdetail/${product.id}`);
                                    }}
                                >
                                    <div className="flex items-center space-x-3">
                                        <img src={product.thumbnail} alt={product.title} className="w-14 h-14 object-cover rounded-md" />
                                        <div>
                                            <h1 className="text-gray-800 text-md font-semibold">{product.title}</h1>
                                            <p className="text-sm text-gray-600 font-medium">{product.brand}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="p-2">
                            <p className="text-center text-gray-500">No results found</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchBox;
