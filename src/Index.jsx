import React, { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import useProductinfo from './utilis/useProductinfo';
import App from './App';
import Error from './component/Error';
import Carousel from './component/Carousel';
import Topproduct from './component/Topproduct';
import ShoppingCart from './component/ShoppingCart';
import ProductFilterAndList from './component/ProductFilterAndList';
import ProductList from './component/ProductList';
import ProductBanners from './component/ProductBanners';
import ProductDetail from './component/ProductDetail';
import { CartProvider } from './utilis/CartContext';

const AppContent = ({ products }) => {
    return (
        <div className="m-8">
            <Carousel
                items={[
                    { src: 'src/assets/slider-1-min.png', alt: 'Slide 1' },
                    { src: 'src/assets/slider-2-min.png', alt: 'Slide 2' },
                ]}
            />
            <Topproduct />
            <ProductBanners />
            <ProductList products={products} />
        </div>
    );
};

const Index = () => {
    const { data, error, loading } = useProductinfo("https://dummyjson.com/products");
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (data) {
            setProducts(data.products);
        }
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // Define routes
    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <App />,  // Main App component (Header, Footer, and Outlet)
            errorElement: <Error />,
            children: [
                {
                    index: true,
                    element: <AppContent products={products} />,  // Home content
                },
                {
                    path: 'category/:category',
                    element: <ProductFilterAndList />,  // Category filter and list
                },
                {
                    path: 'productDetail/:productId',
                    element: <ProductDetail products={products} />,  // Product detail
                },
                {
                    path: '/ShoppingCart',
                    element: <ShoppingCart />,  // Shopping cart
                },
            ],
        },
    ]);

    return (
        <StrictMode>
            <CartProvider>
                <RouterProvider router={appRouter} />
            </CartProvider>
        </StrictMode>
    );
};

export default Index;
