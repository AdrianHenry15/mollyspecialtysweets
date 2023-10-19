import asyncHandler from "express-async-handler"
import User from "../../models/UserModel.js"
import generateToken from "../../utils/generateToken.js"

// @description     Auth user/set token
// route            POST /api/users/auth
// @access          Public
export const loginUser = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body

    const user = await User.findOne({ name: name, $or: [{ email }, { phone }] })

    if (user) {
        generateToken(res, user._id)

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
        })
    } else {
        res.status(401)
        throw new Error("Invalid email or phone")
    }
})
