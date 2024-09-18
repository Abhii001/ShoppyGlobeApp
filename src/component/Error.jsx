import React from "react";
import { useRouteError } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Error() {
    const error = useRouteError();
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate("/");
    };

    return (
        <div className="relative flex flex-col justify-center items-center min-h-screen p-6 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
            <motion.div
                className="bg-white shadow-xl rounded-lg p-8 max-w-xl w-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleBackToHome}
                    startIcon={<ArrowBackIcon />}
                    className="relative bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold py-4 px-8 rounded-full text-lg shadow-lg transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                >
                    Back to Home
                </Button>
                <div className="w-32 h-32 mx-auto mb-6">
                    <iframe
                        src="https://giphy.com/embed/BEob5qwFkSJ7G"
                        width="100%"
                        height="100%"
                        style={{ border: 'none' }}
                        frameBorder="0"
                        className="giphy-embed"
                        allowFullScreen
                        title="Error Illustration"
                    ></iframe>
                </div>
                <h1 className="text-5xl font-extrabold text-red-600 mb-6 text-center">Oops!</h1>
                <p className="text-xl text-gray-800 mb-4 text-center">Something went wrong!</p>
                <p className="text-base text-gray-600 mb-2 text-center">{error.data || "Error details not available"}</p>
                <p className="text-base text-gray-600 mb-2 text-center">Status: {error.status || "Unknown"}</p>
                <p className="text-base text-gray-600 mb-6 text-center">{error.statusText || "No additional information"}</p>
            </motion.div>
        </div>
    );
}

export default Error;
