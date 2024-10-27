import express from 'express';
import { body } from 'express-validator';
import { registerUser, loginUser, verifyEmail } from '../controllers/userController.js';

const router = express.Router();

// User registration route
router.post('/signup', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('firstName')
        .notEmpty()
        .withMessage('First name is required'),
    body('lastName')
        .notEmpty()
        .withMessage('Last name is required'),
], registerUser);

// User login route
router.post('/login', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email'),
    body('password')
        .not()
        .isEmpty()
        .withMessage('Password is required'),
], loginUser);

// Email verification route
router.get('/verify-email/:token', verifyEmail);

export default router;
