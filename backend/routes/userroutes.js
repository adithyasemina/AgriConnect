import express from "express";
import { registerUser, loginUser, getAllUsers, toggleBlockUser } from "../controllers/usercontroller.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin", loginUser);

// Admin ට විතරක් සියලුම පරිශීලකයන් පෙන්වන route එක
router.get("/all", protect, admin, getAllUsers);
router.put("/block/:id", protect, admin, toggleBlockUser);

export default router;