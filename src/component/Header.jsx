import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, AccountCircle, Favorite } from '@mui/icons-material';
import { useCart } from '../utilis/CartContext';
import SearchBox from './SearchBox';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cartItems = [] } = useCart();
    const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
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
                                        {/* Cart Icon */}
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
                    <div className="relative border-2 rounded border-[#3BB77E]/80 w-full flex">
                        <SearchBox />
                    </div>
                </div>
                {/* Desktop Menu */}
                <div className="hidden lg:block w-full lg:w-auto">
                    <div className="flex gap-5 justify-center items-center">
                        {/* Desktop Menu Items */}
                        <ul className="flex space-x-4 items-center">
                            {/* Wishlist */}
                            <li className="relative group">
                                <Link to="/wishlist">
                                    <div className="flex items-center space-x-1 cursor-pointer">
                                        <Favorite className="w-7 text-gray-600" />
                                        <span className="text-gray-600">Wishlist</span>
                                    </div>
                                </Link>
                            </li>
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
            {/* Mobile Dropdown Menu (conditionally rendered) */}
            {isMenuOpen && (
                <div className="lg:hidden absolute bg-white w-full left-0 top-16 z-50 p-4 border-t">
                    <ul className="flex flex-col space-y-4">
                        {/* Wishlist */}
                        <li>
                            <Link to="/wishlist" className="flex items-center space-x-2">
                                <Favorite className="w-6 text-gray-600" />
                                <span>Wishlist</span>
                            </Link>
                        </li>
                        {/* Cart */}
                        <li>
                            <Link to="/ShoppingCart" className="flex items-center space-x-2">
                                <ShoppingCart className="w-6 text-gray-600" />
                                <span>Cart</span>
                            </Link>
                        </li>
                        {/* Account */}
                        <li>
                            <Link to="/user-account" className="flex items-center space-x-2">
                                <AccountCircle className="w-6 text-gray-600" />
                                <span>Account</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;
