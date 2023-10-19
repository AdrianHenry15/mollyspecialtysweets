import asyncHandler from "express-async-handler"
import User from "../../models/UserModel.js"

// @description     GET user profile
// route            POST /api/users/profile
// @access          Private/ have to have a valid token
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            phone: user.phone,
            email: user.email,
            birthday: user.birthday,
        });
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})
