import express from "express";
import { login, signup, logout, getStudents, deleteStudent, getUserProfile, updateProfile, ForgotPassword, ResetPassword, verifyYourEmail } from "../controllers/student.controller.js";
import { verifyUserMiddleware } from "../middleware/auth.middleware.js";
import StudentModel from "../models/user.model.js";
import { uploadMedia, deleteMedia } from "../utils/cloudinary.js";
import upload from "../utils/multer.js";

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
        photoUrl: req.user.photoUrl
      }
    });
  } else {
    res.json({ valid: false });
  }
});
router.patch("/update/:id", upload.single('photoUrl'), updateProfile);
router.delete("/delete/:id", deleteStudent);
router.get("/profile", verifyUserMiddleware, getUserProfile);
router.post("/forgot-password", ForgotPassword);
router.post("/reset-password/:id/:token", ResetPassword);
router.get('/verify-account/:token', verifyYourEmail);

export default router;