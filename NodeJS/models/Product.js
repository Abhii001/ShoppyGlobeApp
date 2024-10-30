import mongoose from 'mongoose';

// Define product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  stockQuantity: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true }
});

// Create Product model
const Product = mongoose.model('Product', productSchema);

export default Product;
