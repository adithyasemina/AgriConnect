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

// සියලුම පරිශීලකයන් ලබා ගැනීම (Admin Only)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// පරිශීලකයෙකු Block/Unblock කිරීම
export const toggleBlockUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            if (user.isAdmin) {
                return res.status(400).json({ message: "ඇඩ්මින් පරිශීලකයෙකු බ්ලොක් කළ නොහැක!" });
            }

            user.isBlocked = !user.isBlocked; // දැනට තියෙන තත්ත්වය මාරු කරයි (Toggle)
            const updatedUser = await user.save();
            
            res.status(200).json({ 
                message: updatedUser.isBlocked ? "පරිශීලකයා බ්ලොක් කරන ලදී." : "පරිශීලකයා අන්බ්ලොක් කරන ලදී.",
                isBlocked: updatedUser.isBlocked 
            });
        } else {
            res.status(404).json({ message: "පරිශීලකයා හමු නොවීය." });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};