import { useState, useEffect } from 'react';

const Carousel = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Auto-rotate every 10 seconds
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === items.length - 1 ? 0 : prevIndex + 1
            );
        }, 10000);

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, [items.length]);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? items.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === items.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="m-auto border rounded-xl sm:w-[85%] w-full relative flex items-center overflow-hidden">
            <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 cursor-pointer z-10 rounded-3xl ml-4"
                onClick={handlePrev}
            >
                &#10094;
            </button>
            <div className="flex-1 flex justify-center items-center">
                <img
                    src={items[currentIndex].src}
                    alt={items[currentIndex].alt}
                    className="max-w-full h-auto"
                />
            </div>
            <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 cursor-pointer z-10 rounded-3xl mr-4"
                onClick={handleNext}
            >
                &#10095;
            </button>
        </div>
    );
};

export default Carousel;
