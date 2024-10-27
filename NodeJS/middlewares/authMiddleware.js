import jwt from 'jsonwebtoken';
import User from '../models/Users.js';

// Middleware to verify JWT token
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the user to the request object (excluding password)
    req.user = await User.findById(decoded.id).select('-password');
    
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
