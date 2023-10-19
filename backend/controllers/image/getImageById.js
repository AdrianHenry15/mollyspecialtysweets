import Image from '../../models/ImageModel.js';
import asyncHandler from 'express-async-handler';

// Get a single image by ID
export const getImageById = asyncHandler(async (req, res) => {
    const image = await Image.findById(req.params.id);
    if (!image) {
        res.status(404);
        throw new Error('Image not found');
    }
    res.status(200).json(image);
});