import React, { StrictMode, useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
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
import Login from './component/Login';
import Signup from './component/Signup';
import { CartProvider } from '../src/utilis/CartContext';
import { UserProvider } from './utilis/UserContext';

const AppContent = ({ products }) => (
    <div className="m-8">
        <Carousel
            items={[
                { src: 'slider-1-min.png', alt: 'Slide 1' },
                { src: 'slider-2-min.png', alt: 'Slide 2' },
            ]}
        />
        <Topproduct />
        <ProductBanners />
        <ProductList products={products} />
    </div>
);

const Index = () => {
    const { data, error, loading } = useProductinfo("https://dummyjson.com/products");
    const [products, setProducts] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check if the user is authenticated
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    // Set products when data is fetched
    useEffect(() => {
        if (data) {
            setProducts(data.products);
        }
    }, [data]);

    // Define loading and error states
    if (loading) return <LoadingIndicator />;
    if (error) return <Error message={error.message} />;

    // Define routes
    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: isAuthenticated ? <App /> : <Navigate to="/signup" />,
            errorElement: <Error />, // Global error handler
            children: [
                {
                    index: true,
                    element: <AppContent products={products} />,
                },
                {
                    path: 'category/:category',
                    element: <ProductFilterAndList />,
                },
                {
                    path: 'productDetail/:productId',
                    element: <ProductDetail products={products} />,
                },
                {
                    path: 'ShoppingCart',
                    element: <ShoppingCart />,
                },
            ],
        },
        {
            path: '/signup',
            element: <Signup setIsAuthenticated={setIsAuthenticated} />,
        },
        {
            path: '/login',
            element: <Login setIsAuthenticated={setIsAuthenticated} />,
        },
    ]);

    return (
        <StrictMode>
            <UserProvider>
                <CartProvider isAuthenticated={isAuthenticated}>
                    <RouterProvider router={appRouter} />
                </CartProvider>
            </UserProvider>
        </StrictMode>
    );
};

// Loading Indicator Component
const LoadingIndicator = () => (
    <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
    </div>
);

export default Index;
