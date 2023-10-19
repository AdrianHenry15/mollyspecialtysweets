import asyncHandler from 'express-async-handler'
import User from '../../models/UserModel.js'

// get a list of all products
export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();

    if (users.length === 0) {
        res.status(400).json({ message: "No users found" });
    } else {
        res.status(200).json(users);
    }
})