import asyncHandler from 'express-async-handler'
import Product from '../../models/ProductModel.js'

// get a list of all products
export const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
})