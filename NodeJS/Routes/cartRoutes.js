import express from 'express';
import { getCartItems, addToCart } from '../controllers/cartController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getCartItems).post(protect, addToCart);

export default router;
