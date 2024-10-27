import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import User from '../models/Users.js';

// Create a transporter for nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Change to your email service if needed
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password
    },
});

// Register User
export const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            if (user.isVerified) {
                return res.status(400).json({ message: 'User already registered and verified' });
            }

            // Regenerate the verification token if the user is not verified
            user.verificationToken = crypto.randomBytes(32).toString('hex');
            await user.save();
        } else {
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a verification token
            const verificationToken = crypto.randomBytes(32).toString('hex');

            // Create a new user
            user = new User({ firstName, lastName, email, password: hashedPassword, verificationToken });
            await user.save();
        }

        // Send verification email
        const verificationUrl = `http://localhost:2100/api/verify-email/${user.verificationToken}`; // Update for production
        try {
            await transporter.sendMail({
                to: email,
                subject: 'Email Verification',
                html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
            });
        } catch (error) {
            console.error('Error sending verification email:', error);
            return res.status(500).json({ message: 'Error sending verification email', error: error.message });
        }

        res.status(201).json({ message: 'User registered successfully. Please check your email to verify your account.' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

// Email verification
export const verifyEmail = async (req, res) => {
    const { token } = req.params;

    try {
        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(400).json({ message: 'Invalid verification token' });
        }

        // Mark user as verified
        user.isVerified = true;
        user.verificationToken = undefined; // Clear the verification token
        await user.save();

        res.status(200).json({ message: 'Email verified successfully!' });
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ message: 'Error verifying email', error: error.message });
    }
};

// Login User
export const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

// Exporting all controller functions
export default {
    registerUser,
    verifyEmail,
    loginUser,
};
