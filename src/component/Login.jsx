import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';

const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (credentials) => {
        try {
            const response = await axios.post('http://localhost:2100/api/login', credentials);
            const { token } = response.data;
            localStorage.setItem('token', token);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };
    


    return (
        <div className="relative flex flex-col justify-center items-center min-h-screen p-6 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
            <motion.div
                className="bg-white shadow-xl rounded-lg p-8 max-w-xl w-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg py-2 transition duration-200"
                    >
                        Login
                    </Button>
                    {error && <p className="text-red-600 text-center">{error}</p>}
                </form>
                <p className="mt-4 text-center">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-600 hover:underline">
                        Signup
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
