import express from 'express'
import { getAllImages } from '../controllers/image/getAllImages.js';
import { createImage } from '../controllers/image/createImage.js';
import { getImageById } from '../controllers/image/getImageById.js';
import { updateImage } from '../controllers/image/updateImage.js';
import { deleteImage } from '../controllers/image/deleteImage.js';


const router = express.Router()

router.post('/', createImage);
router.get('/', getAllImages);
router.get('/:id', getImageById)
router.put('/:id', updateImage);
router.delete('/:id', deleteImage)

export default router
