import express from "express";
import { registerUser, loginUser } from "../controllers/usercontroller.js";
// Middleware දෙක import කරගන්න
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// 1. මේවා ඕනෑම කෙනෙක්ට පාවිච්චි කළ හැකි Routes (Public)
router.post("/signup", registerUser);
router.post("/signin", loginUser);

// 2. මේක ලොග් වුණු අයට විතරක් පාවිච්චි කළ හැකි Route එකක් (Protected)
// router.get("/profile", protect, getUserProfile); 

// 3. මේක Admin ට විතරක් පාවිච්චි කළ හැකි Route එකක් (Admin Only)
// router.get("/", protect, admin, getAllUsers);

export default router;