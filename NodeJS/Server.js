import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import productRoutes from './Routes/productRoutes.js';
import userRoutes from './Routes/userRoutes.js';
import cartRoutes from './Routes/cartRoutes.js';

dotenv.config();

console.log('PORT:', process.env.PORT);
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('CLIENT_ID:', process.env.CLIENT_ID);
console.log('CLIENT_SECRET:', process.env.CLIENT_SECRET);
console.log('REFRESH_TOKEN:', process.env.REFRESH_TOKEN);

const app = express();

app.use(helmet());

const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
app.use(express.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
app.use(limiter);

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/ShoppyGlobeData";
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message);
        setTimeout(connectDB, 5000);
    }
};

connectDB();

app.use('/api/products', productRoutes);
app.use('/api', userRoutes);
app.use('/api/cart', cartRoutes);

app.use((err, req, res, next) => {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 2100;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

process.on('SIGINT', async () => {
    console.log('SIGINT signal received: closing MongoDB connection');
    await mongoose.connection.close();
    process.exit(0);
});
