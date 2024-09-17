import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, AccountCircle } from '@mui/icons-material';
import { useCart } from '../utilis/CartContext'; // Import your CartContext

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Access cart from context with default value
    const { cartItems = [] } = useCart();

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Calculate the number of items in cart
    const cartQuantity = cartItems.length;

    return (
        <>
            <header className="max-w-8xl mx-auto px-4 2xl:px-0 py-8 border">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 xl:gap-10 w-full lg:w-[80%] mx-auto">
                    {/* Logo and Search Bar */}
                    <div className="flex flex-col xl:flex-row gap-8 xl:items-center w-full">
                        <div className="flex justify-between w-full lg:w-auto">
                            <Link to="/">
                                <h1 className="text-green-600 font-extrabold text-2xl">ShoppyGlobe</h1>
                            </Link>
                            {/* Mobile Menu Icons */}
                            <ul className="flex lg:hidden space-x-5 items-center">
                                <li>
                                    <Link to="/ShoppingCart">
                                        <button className="flex items-center space-x-1 cursor-pointer relative">
                                            {/* Cart Icon with Notification Badge */}
                                            <ShoppingCart className="w-8 text-gray-600" />
                                            {cartQuantity > 0 && (
                                                <div className="absolute p-1 -top-3 -right-1 rounded-full w-4 h-4 flex justify-center items-center bg-green-500 text-white">
                                                    <span className="text-xs">{cartQuantity}</span>
                                                </div>
                                            )}
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <button className="flex items-center space-x-1 cursor-pointer" onClick={handleMenuToggle}>
                                        {/* Menu Icon */}
                                        <Menu className="w-8 text-gray-600" />
                                    </button>
                                </li>
                            </ul>
                        </div>
                        {/* Search Bar */}
                        <div className="border-2 rounded border-[#3BB77E]/80 pr-1 w-full flex">
                            <input className="w-full ml-2 mr-1 py-[10px] border-none outline-none bg-transparent" type="text" placeholder="Search for products..." />
                            <input className="bg-primary cursor-pointer font-semibold my-1 px-5 rounded text-white bg-green-800" type="submit" value="Search" />
                        </div>
                    </div>
                    {/* Desktop Menu */}
                    <div className="hidden lg:block w-full lg:w-auto">
                        <div className="flex gap-5 justify-center items-center">
                            {/* Desktop Menu Items */}
                            <ul className="flex space-x-4 items-center">
                                {/* Cart */}
                                <li className="relative group">
                                    <Link to="/ShoppingCart">
                                        <div className="flex items-center space-x-1 cursor-pointer">
                                            <div className="relative">
                                                <ShoppingCart className="w-7 text-gray-600" />
                                                {cartQuantity > 0 && (
                                                    <div className="absolute p-1 -top-[15px] -right-1.5 rounded-full w-5 h-5 flex justify-center items-center bg-green-500 text-white">
                                                        <span className="text-sm">{cartQuantity}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-gray-600">Cart</span>
                                        </div>
                                    </Link>
                                </li>
                                {/* User */}
                                <li className="relative group">
                                    <Link to="/user-account">
                                        <div className="flex items-center space-x-1 cursor-pointer">
                                            <AccountCircle className="w-7 text-gray-600" />
                                            <span className="text-gray-600">Account</span>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
