import express from "express";
import { login, signup, logout, getStudents, updateStudent, deleteStudent, getUserProfile, verifyUser } from "../controllers/student.controller.js";
import { verifyUserMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.get("/", getStudents);
router.patch("/update/:id", updateStudent);
router.delete("/delete/:id", deleteStudent);
router.get("/profile", verifyUserMiddleware, getUserProfile);
router.get("/verifyuser", verifyUser);

export default router;