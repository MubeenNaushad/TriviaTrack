import express from "express";
import {
  login,
  signup,
  logout,
  getStudents,
  deleteStudent,
  getUserProfile,
  updateProfile,
  ForgotPassword,
  ResetPassword,
  verifyYourEmail,
  getMyLearning,
  getStudentProfile,
} from "../controllers/student.controller.js";
import { verifyUserMiddleware } from "../middleware/auth.middleware.js";
import StudentModel from "../models/user.model.js";
import { uploadMedia, deleteMedia } from "../utils/cloudinary.js";
import upload from "../utils/multer.js";
import passport from "passport";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.get("/", getStudents);
router.get("/verifyuser", verifyUserMiddleware, (req, res) => {
  if (req.user) {
    res.json({
      valid: true,
      user: {
        name: req.user.name,
        email: req.user.email,
        userType: req.user.userType,
        photoUrl: req.user.photoUrl,
        isVerified: req.user.isVerified,
      },
    });
  } else {
    res.json({ valid: false });
  }
});
router.patch("/update/:id", upload.single("photoUrl"), updateProfile);
router.delete("/delete/:id", deleteStudent);
router.get("/profile", verifyUserMiddleware, getUserProfile);
router.post("/forgot-password", ForgotPassword);
router.post("/reset-password/:id/:token", ResetPassword);
router.get("/verify-the-account/:token", verifyYourEmail);
router.get("/get-my-learning", verifyUserMiddleware, getMyLearning);
router.get("/student-details/:studentId", getStudentProfile);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google OAuth Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failure",
  }),
  (req, res) => {
    // Respond with JWT on successful authentication
    const { user, token } = req.user;
    res.json({
      message: "Authentication successful",
      user,
      token,
    });
  }
);

// Failure Route
router.get("/failure", (req, res) => {
  res.status(401).json({ message: "Authentication failed" });
});

export default router;
