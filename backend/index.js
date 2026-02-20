import express from "express";
import cors from "cors";
dotenv.config();
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userroutes.js";


const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected Successfully!");
    })
    .catch((err) => {
        console.error("❌ MongoDB Connection Error: ", err.message);
    });

app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});