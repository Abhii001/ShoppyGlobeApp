import express from 'express';
import { addToCart, getCartItems } from '../controllers/cartController.js';
import { protect } from '../middlewares/authMiddleware.js'; // Import the middleware

const router = express.Router();

// Add a product to the cart (protected route)
router.post('/add', protect, addToCart);

// Get cart items (protected route)
router.get('/', protect, getCartItems);

export default router;
