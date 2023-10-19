import asyncHandler from "express-async-handler"
import User from "../../models/UserModel.js"
import generateToken from "../../utils/generateToken.js"

// USER REGISTRATION
// @description     Register a new user
// route            POST /api/users
// @access          Public
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body

    // Check if the user with provided email or phone number already exists
    const existingUser = await User.findOne({
        $or: [{ email }, { phone }],
    })

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" })
    }

    // Create new user document with name, phone, and/or email
    const newUser = new User({ name })

    if (email) newUser.email = email;
    if (phone) newUser.phone = phone;

    // Save the user to the database
    await newUser.save()

    // Generate and send a token
    generateToken(res, newUser._id)

    res.status(201).json({ user: newUser })
})
