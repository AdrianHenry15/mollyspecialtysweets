import Image from '../../models/ImageModel.js';
import asyncHandler from 'express-async-handler';

// Delete an image by ID
export const deleteImage = asyncHandler(async (req, res) => {
    const deletedImage = await Image.findByIdAndRemove(req.params.id);
    if (!deletedImage) {
        res.status(404);
        throw new Error('Image not found');
    }
    res.status(204).end();
});