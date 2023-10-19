import Image from '../../models/ImageModel.js';
import asyncHandler from 'express-async-handler';

// Create a new image
export const createImage = asyncHandler(async (req, res) => {
    const { name, fileName, description } = req.body;
    const image = new Image({ name, fileName, description });
    const savedImage = await image.save();
    res.status(201).json(savedImage);
});


