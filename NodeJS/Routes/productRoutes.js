import express from 'express';
import { getProducts, getProductById, createProduct } from '../controllers/productController.js';

const router = express.Router();

// Fetch all products
router.get('/', getProducts);

// Fetch a product by ID
router.get('/:id', getProductById);

// Create a new product
router.post('/', createProduct);

export default router;
