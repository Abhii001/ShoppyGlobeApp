import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import productRoutes from './Routes/productRoutes.js'
import userRoutes from './Routes/userRoutes.js';
import cartRoutes from './Routes/cartRoutes.js'

// Load environment variables
dotenv.config();


// Initialize app
const app = express();

// Security: Helmet for setting various HTTP headers
app.use(helmet());

const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];

// Middlewares
app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // If you're handling cookies/auth headers
}));
app.use(express.json()); // To parse JSON requests

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// MongoDB connection function
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/ShoppyGlobeData"; // Ensure this URI is correct
        await mongoose.connect(mongoURI, {
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message);
        setTimeout(connectDB, 5000); // Retry connection after 5 seconds
    }
};

connectDB(); // Establish MongoDB connection




// API Routes
app.use('/api/products', productRoutes); // Product routes
app.use('/api', userRoutes); // User routes
app.use('/api/cart', cartRoutes); // Cart routes

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// Start the server on port 2100 or the port specified in the environment variable
const PORT = process.env.PORT || 2100;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Handle graceful server shutdown
process.on('SIGINT', async () => {
    console.log('SIGINT signal received: closing MongoDB connection');
    await mongoose.connection.close();
    process.exit(0);
});
