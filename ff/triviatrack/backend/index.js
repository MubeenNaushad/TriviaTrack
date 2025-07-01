import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import studentRoutes from "./routes/student.routes.js";
import courseRoutes from "./routes/course.routes.js";
import mediaRoutes from "./routes/media.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";
import coursePurchaseRoute from "./routes/coursePurchase.route.js";
import teacherProfileRoutes from "./routes/teacherProfile.routes.js";
import passport from "passport";
import session from "express-session";
import GoogleStrategy from "passport-google-oauth20";
import "./Config/passport.js";
import authRoutes from "./routes/auth.routes.js";
import financialAidRoutes from "./routes/financialAid.routes.js";
import forumRoutes from "./routes/forum.routes.js";
import quizRoutes from "./routes/quiz.routes.js";
import chatRoutes from "./routes/chatbot.routes.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,           
      secure: true,             
      sameSite: "none",         
      maxAge: 1000 * 60 * 60 * 24 
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

console.log(process.env.FRONTEND_URL);

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URI)
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
app.use("/progress", courseProgressRoute);
app.use("/purchase", coursePurchaseRoute); 
app.use("/teacher", teacherProfileRoutes);
app.use("/auth", authRoutes); 
app.use("/financial-aid", financialAidRoutes);
app.use("/forum", forumRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/chatbot", chatRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
