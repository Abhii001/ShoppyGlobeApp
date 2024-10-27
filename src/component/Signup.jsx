import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Make sure to import Link
import { Button } from '@mui/material';
import { motion } from 'framer-motion';

const Signup = ({ setIsAuthenticated, toggleSignup }) => {
    const [formData, setFormData] = useState({ email: '', password: '', firstName: '', lastName: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:2100/api/signup', formData);
            setSuccess('Signup successful! Redirecting to login...');
            setTimeout(() => {
                setIsAuthenticated(true); // Set authenticated state if needed
                navigate('/login');
            }, 1500); // Redirect to login
        } catch (err) {
            setError('Signup failed. Please check your inputs and try again.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="relative flex flex-col justify-center items-center min-h-screen p-6 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
            <motion.div
                className="bg-white shadow-xl rounded-lg p-8 max-w-xl w-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-semibold text-center mb-6">Signup</h2>
                <form onSubmit={handleSignup} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg py-2 transition duration-200"
                    >
                        Signup
                    </Button>
                    {error && <p className="text-red-600 text-center">{error}</p>}
                    {success && <p className="text-green-600 text-center">{success}</p>}
                </form>
                <p className="mt-4 text-center">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Signup;
