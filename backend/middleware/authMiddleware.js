import jwt from "jsonwebtoken";
import User from "../models/usersmodel.js";

/* 1. පරිශීලකයා ලොග් වී ඇත්දැයි පරීක්ෂා කරන Middleware එක (Protect Middleware) */
export const protect = async (req, res, next) => {
    let token;

    // Checks if Authorization header exists and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {

            // Extracts the actual token from the "Bearer <token>" string
            token = req.headers.authorization.split(" ")[1];

            // Verifies the token using our Secret Key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Finds the user in DB by ID from token, excluding the password field
            req.user = await User.findById(decoded.id).select("-password");

            // Moves to the next middleware or controller function
            next();
        } catch (error) {
            // Returns 401 error if token verification fails
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    // Returns 401 error if no token is provided at all
    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};

/* 2. පරිශීලකයා Admin කෙනෙක්දැයි පරීක්ෂා කරන Middleware එක (Admin Middleware) */
export const admin = (req, res, next) => {
    // Checks if the logged-in user has admin privileges
    if (req.user && req.user.isAdmin) {
        // Grants access if the user is an admin
        next();
    } else {
        // Returns 403 Forbidden error if user is not an admin
        res.status(403).json({ message: "Not authorized as an admin" });
    }
};