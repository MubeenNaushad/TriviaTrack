import express from "express";
import { login, signup, logout, getStudents, updateStudent, deleteStudent, getUserProfile } from "../controllers/student.controller.js";
import { verifyUserMiddleware } from "../middleware/auth.middleware.js";


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
        userType: req.user.userType
      }
    });
  } else {
    res.json({ valid: false });
  }
});
router.patch("/update/:id", updateStudent);
router.delete("/delete/:id", deleteStudent);
router.get("/profile", verifyUserMiddleware, getUserProfile);

export default router;