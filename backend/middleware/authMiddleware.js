import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'
import User from '../models/UserModel.js';

//protect routes that require a valid token
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // get token from requests cookies
    token = req.cookies.jwt;

    if (token) {
        try {
            // verify token using the JWT_SECRET from the enviroment vars
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // fetch user data using the decoded user id and attach it to the request
            req.user = await User.findById(decoded.userId);
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, invalid token')
        }

    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

// admin middleware to check if user is admin for ecommerce 
const protectAdmin = asyncHandler(async (req, res, next) => { })

export { protect }