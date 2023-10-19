import asyncHandler from "express-async-handler"
import User from "../../models/UserModel.js"

// @description     UPDATE user profile
// route            PUT /api/users/profile
// @access          Private/ have to have a valid token
export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        // Update user's profile fields if provided in the request
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.phone = req.body.phone || user.phone
        user.birthday = req.body.birthday || user.birthday

        const updatedUser = await user.save()

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            birthday: updatedUser.birthday,
            message: "User Profile Updated",
        })
    } else if (!user) {
        res.status(404)
        throw new Error("User not found")
    }
})

// export const updateUserProfile = asyncHandler(async (req, res) => {
//   const userId = req.params.id;

//   const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
//     new: true, // Return the updated product
//   });

//   if (updatedUser) {
//     res.status(200).json(updatedUser);
//   } else {
//     res.status(404).json({ message: 'User not found' });
//   }
// });
