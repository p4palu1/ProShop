import express from "express"
const router = express.Router()
import { getProductById,
        getProducts, deleteProduct, updatedProduct, createdProduct, createProductReview, getTopProducts
        } from "../controllers/productController.js"
import { protect, admin } from "../middleware/authMiddleware.js"


router.route('/').get(getProducts).post(protect, admin, createdProduct)
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updatedProduct)
router.get('/top/:top', getTopProducts)
router.route('/:id/reviews').post(protect, createProductReview)



export default router;