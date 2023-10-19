import asyncHandler from 'express-async-handler'
import Product from '../../models/ProductModel.js'

// Get a single product by ID
export const getProductById = asyncHandler(async (req, res) => {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});