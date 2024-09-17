import { Link } from "react-router-dom";
import { Star as StarIcon, Add as AddIcon } from '@mui/icons-material';

function ProductItems({ product }) {
    if (!product) return null;

    return (
        <Link to={`/productdetail/${product.id}`} className="block">
            <div className="relative border border-gray-200 duration-300 rounded-[15px] overflow-hidden p-5 bg-white shadow-lg hover:shadow-2xl transition-shadow ease-in-out transform hover:scale-105">
                {/* Thumbnail */}
                <div className="relative flex justify-center">
                    <img
                        src={product.thumbnail || '/path/to/default/image.jpg'} // Fallback image path
                        alt={product.title || 'Product Image'}
                        className="w-[75%] md:w-full object-cover"
                    />
                </div>
                {/* Product details */}
                <div className="p-4">
                    <Link to={`/category/${product.category}`} className="text-[#adadad] text-[12px]">{product.category}</Link>
                    <h3 className="text-[#253d4e] text-[16px] font-bold leading-5 my-2">
                        <Link to={`/productdetail/${product.id}`}>{product.title}</Link>
                    </h3>
                    {/* Rating */}
                    <div className="flex gap-1 items-center">
                        <div className="flex">
                            {[...Array(5)].map((_, index) => (
                                <StarIcon key={index} className={`w-4 h-4 ${index < product.rating ? "text-yellow-500" : "text-gray-400"}`} />
                            ))}
                        </div>
                        <span>{product.rating}</span>
                    </div>
                    {/* Price and Add to Cart */}
                    <div className="flex justify-between items-center mt-4">
                        <div className="flex gap-x-3">
                            <h5 className="text-primary text-[18px] font-bold underline">
                                <span>₹{product.price}</span>
                            </h5>
                            {product.originalPrice && (
                                <h5 className="text-gray-300 line-through text-[15px] font-bold decoration-2">
                                    <span>₹{product.originalPrice}</span>
                                </h5>
                            )}
                        </div>
                        <button className="text-primary px-[10px] py-1 gap-1 rounded flex bg-primary/20" aria-label="Add to cart">
                            <AddIcon className="w-4 h-4" />
                            Add
                        </button>
                    </div>
                </div>
                {/* Discount label */}
                {product.discount && (
                    <div className="absolute top-0 left-0 z-10">
                        <div className="bg-primary px-5 py-2 text-white font-semibold text-[12px] rounded-br-2xl">
                            {product.discount}%
                        </div>
                    </div>
                )}
            </div>
        </Link>
    );
}

export default ProductItems;
