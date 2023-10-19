import asyncHandler from 'express-async-handler'
import Product from '../../models/ProductModel.js'

// Delete a product by ID
export const deleteProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id;

    const deletedProduct = await Product.findByIdAndRemove(productId);

    if (deletedProduct) {
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});