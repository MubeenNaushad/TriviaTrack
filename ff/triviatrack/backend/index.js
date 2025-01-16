import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import studentRoutes from "./routes/student.routes.js";
import courseRoutes from "./routes/course.routes.js";
import mediaRoutes from "./routes/media.route.js"; 

dotenv.config();

const app = express();

app.use(express.json());

console.log(process.env.FRONTEND_URL);

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

// Handle OPTIONS requests for preflight
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        return res.status(200).end();
    }
    next();
});

app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB " + process.env.MONGO_URI);
    })
    .catch((err) => {
        console.log(err);
    });

// Routes
app.use("/media", mediaRoutes);
app.use("/students", studentRoutes); 
app.use("/course", courseRoutes);

app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
});
