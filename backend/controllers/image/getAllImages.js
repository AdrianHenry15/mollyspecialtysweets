import Image from '../../models/ImageModel.js';
import asyncHandler from 'express-async-handler';

// Get all images
export const getAllImages = asyncHandler(async (req, res) => {
    const images = await Image.find();
    res.status(200).json(images);
});