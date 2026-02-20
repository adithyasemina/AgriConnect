import User from "../models/usersmodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



// 1. Register User
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, isAdmin } = req.body;

        if (password !== confirmPassword) {
            console.log("Passwords do not match!");
            return res.status(400).json({ message: "Passwords do not match!" })
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log("User already exists");
            return res.status(400).json({ message: "User already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            isAdmin
        });

        if (user) {
            console.log("User registered successfully!");
            res.status(201).json({ message: "User registered successfully!"});
        }
    } catch (error) {
        console.log("User registered Unsuccessfully!");
        res.status(500).json({ message: error.message });
    }
};




// 2. ලොගින් වීම (Login User)
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Email එක මගින් User කෙනෙක් ඉන්නවාදැයි බැලීම
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // JWT Token එකක් සෑදීම (Secret key එකක් පාවිච්චි කරන්න)
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1d",
            });

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: token,
                message: "Login successful",
            });
            console.log("Login successful");
        } else {
            res.status(401).json({ message: "Invalid email or password" });
            console.log("Invalid email or password");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};