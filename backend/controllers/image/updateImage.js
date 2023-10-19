import Image from '../../models/ImageModel.js';
import asyncHandler from 'express-async-handler';

// Update an image by ID
export const updateImage = asyncHandler(async (req, res) => {
    const { name, fileName, description } = req.body;
    const updatedImage = await Image.findByIdAndUpdate(
        req.params.id,
        { name, fileName, description },
        { new: true }
    );
    if (!updatedImage) {
        res.status(404);
        throw new Error('Image not found');
    }
    res.status(200).json(updatedImage);
});