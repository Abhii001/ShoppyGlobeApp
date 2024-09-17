import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBack as ArrowBackIcon, ShoppingCart as ShoppingCartIcon, AddShoppingCart as AddShoppingCartIcon } from '@mui/icons-material';
import { Button } from '@mui/material';

const ProductDetail = ({ products }) => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const product = products.find(p => p.id === parseInt(productId, 10));

    if (!product) return <div>Product not found</div>;

    return (
        <div className="sm:px-20 mx-auto">
            <Button 
                onClick={() => navigate(-1)}
                startIcon={<ArrowBackIcon />}
                className="text-blue-500 hover:text-blue-700"
                variant="text"
            >
                Back
            </Button>

            <div className="detailSection grid grid-cols-1 gap-4 sm:grid-cols-2 overflow-auto pt-6">
                {/* Product Image and Details */}
                <div>
                    <div className="flex flex-col sm:flex-row items-center sm:items-start">
                        <div className="w-full bg-white">
                            <div className="flex justify-center items-center">
                                <img src={product.thumbnail} alt={product.title} className="w-full rounded-lg sm:w-80" />
                            </div>
                            <div className="hidden sm:block w-full">
                                <div className="flex">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className="w-full py-4"
                                        startIcon={<AddShoppingCartIcon />}
                                    >
                                        Buy Now
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className="w-full py-4"
                                        startIcon={<ShoppingCartIcon />}
                                    >
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="w-full px-4 bg-white">
                        <p className="text-sm text-blue-500 font-extrabold">View more from {product.title}</p>
                        <p className="text-xs text-slate-500">
                            <strong className="text-black">{product.title}</strong> {product.description}
                        </p>

                        <div className="offers flex gap-4 items-center py-2">
                            <p className="text-green-600 font-extrabold text-lg">{product.discount}% off</p>
                            <span className="line-through text-slate-400">₹{product.originalPrice}</span>
                            <span>₹{product.price}</span>
                        </div>

                        <p className="text-green-600 mt-4 border inline-block px-2 shadow-md font-semibold">In Stock</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
