import asyncHandler from 'express-async-handler'
import User from '../../models/UserModel.js'

// delete method
export const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.user._id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(204).send(); // Successful deletion, no content in response
})