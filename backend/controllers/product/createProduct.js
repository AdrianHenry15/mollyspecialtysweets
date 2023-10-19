import asyncHandler from 'express-async-handler'
import Product from '../../models/ProductModel.js'

// create product but only if your admin
export const createProduct = asyncHandler(async (req, res) => {
    const product = new Product(req.body);
    const savedProduct = await product.save();

    if (!savedProduct) {
        res.status(400).json({ message: 'Failed to create the product. Please include required fields.' });
    }
    res.status(201).json(savedProduct);
});