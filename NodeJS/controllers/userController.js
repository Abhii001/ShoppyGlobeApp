import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import User from '../models/Users.js';
import { google } from 'googleapis';

const { OAuth2 } = google.auth;

const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'https://developers.google.com/oauthplayground' // or your redirect URI
);

// Set the credentials
oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
});

// Create a transporter
const createTransporter = async () => {
    try {
        // Fetch the access token using the OAuth2 client
        const accessToken = await oauth2Client.getAccessToken();
        
        // Check if the access token is valid
        if (!accessToken || !accessToken.token) {
            throw new Error('Access token is empty or invalid');
        }

        // Create and return the Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL_USER,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken.token,
            },
        });

        return transporter;
    } catch (error) {
        console.error('Error creating transporter:', error);
        throw new Error('Could not create transporter: ' + error.message);
    }
};

const sendEmail = async (to, subject, text) => {
    try {
        const transporter = await createTransporter();
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

// Call sendEmail
sendEmail('avee.abhishek220@gmail.com', 'Test Subject', 'Hello from Nodemailer with OAuth2!');

// Register User
export const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            if (user.isVerified) {
                return res.status(400).json({ message: 'User already registered and verified' });
            }

            user.verificationToken = crypto.randomBytes(32).toString('hex');
            await user.save();
        } else {
            const verificationToken = crypto.randomBytes(32).toString('hex');
            user = new User({
                firstName,
                lastName,
                email,
                password,
                verificationToken,
            });
            await user.save();
        }

        const transporter = await createTransporter();
        const verificationUrl = `http://localhost:2100/api/verify-email/${user.verificationToken}`;
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Email Verification',
            html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
        });

        res.status(201).json({ message: 'User registered successfully. Please check your email to verify your account.' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

// Email Verification
export const verifyEmail = async (req, res) => {
    const { token } = req.params;

    try {
        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(400).json({ message: 'Invalid verification token' });
        }

        user.isVerified = true;
        user.verificationToken = undefined; // Clear verification token
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
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

export default {
    registerUser,
    verifyEmail,
    loginUser,
};
