import express from 'express'
import { createProduct } from '../controllers/product/createProduct.js'
import { getAllProducts } from '../controllers/product/getAllProducts.js'
import { getProductById } from '../controllers/product/getProductById.js'
import { updateProduct } from '../controllers/product/updateProduct.js'
import { deleteProduct } from '../controllers/product/deleteProduct.js'

const router = express.Router()

router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

export default router
