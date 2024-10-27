import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the User schema
const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
  });

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  try {
    // Only hash the password if it has been modified or it's new
    if (!this.isModified('password')) return next();
    
    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
    next();
  } catch (error) {
    next(error); // Pass error to the next middleware
  }
});

// Compare passwords during login
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

delete mongoose.models['User'];
// Create User model and specify collection name explicitly
const User = mongoose.model('User', userSchema, 'usersInfo'); // Specify collection name here

export default User;
