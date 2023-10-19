// to limit use of try and catch methods
import asyncHandler from "express-async-handler"

export const logoutUser = asyncHandler(async (req, res, next) => {
    try {
        res.cookie("jwt", "", {
            httpOnly: true,
            expires: new Date(0),
        })

        res.status(200).json({ message: "User logged out" })
    } catch (error) {
        // if an error occurs during the logout process, create a custom error object
        const customError = new Error("Logout failed.")
        customError.status = 500;

        next(customError)
    }

})
