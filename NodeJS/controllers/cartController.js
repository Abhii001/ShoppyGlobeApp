import Cart from '../models/Cart.js';


// Get cart items for a user
export const getCartItems = async (req, res) => {
    const userId = req.user._id; // Extracted from JWT token by protect middleware

    try {
        const cart = await Cart.findOne({ user: userId }).populate('items.product'); // Optionally populate product details
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cart items', error: error.message });
    }
};

// Add a product to the cart
export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id; // Extracted from JWT token by protect middleware

    // Input validation
    if (!productId || !quantity || quantity <= 0) {
        return res.status(400).json({ message: 'Invalid product ID or quantity' });
    }

    try {
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            // If the item exists in the cart, update the quantity
            cart.items[itemIndex].quantity += quantity;
        } else {
            // Add new item to the cart
            cart.items.push({ product: productId, quantity });
        }

        // Save the updated cart
        const savedCart = await cart.save();
        res.status(200).json({ message: 'Item added to cart', cart: savedCart });
    } catch (error) {
        res.status(500).json({ message: 'Error adding to cart', error: error.message });
    }
};
