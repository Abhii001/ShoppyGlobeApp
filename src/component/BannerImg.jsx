import React from 'react';
import { Link } from 'react-router-dom';

const BannerImg = ({ imageSrc, link, alt, title, buttonText, className }) => (
    <div className={`relative group overflow-hidden rounded-lg cursor-pointer ${className}`}>
        <img
            src={imageSrc}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
        <Link 
            to={link} 
            className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
        >
            <div className="text-sm sm:text-base md:text-lg font-semibold mb-3 sm:mb-4">
                {title}
            </div>
            <button className="bg-green-600 px-3 py-1.5 rounded-md text-xs sm:text-sm md:text-base">
                {buttonText}
            </button>
        </Link>
    </div>
);

export default BannerImg;
