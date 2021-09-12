import express from "express"
const router = express.Router()
import { authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser } from "../controllers/userController.js"
import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import { protect, admin } from "../middleware/authMiddleware.js"

router.get("/", asyncHandler(async(req, res) => {
    const users = await User.find()
    res.json(users)
}))

router.route('/').post(registerUser)
router.route('/').get(admin ,protect, getUsers)
router.post('/login', authUser)
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser)


 
export default router;