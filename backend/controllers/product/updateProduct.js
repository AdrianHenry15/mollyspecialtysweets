import asyncHandler from 'express-async-handler'
import Product from '../../models/ProductModel.js'

// Update a product by ID
export const updateProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id;

    const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {
        new: true, // Return the updated product
    });

    if (updatedProduct) {
        res.status(200).json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});
