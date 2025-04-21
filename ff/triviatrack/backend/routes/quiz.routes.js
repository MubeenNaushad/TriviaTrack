import express from "express";
import {
  createQuiz,
  getQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
} from "../controllers/quiz.controller.js";
import { verifyUserMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", verifyUserMiddleware, createQuiz);

router.get("/", getQuizzes);

router.get("/:id", getQuizById);

router.put("/:id", verifyUserMiddleware, updateQuiz);

router.delete("/:id", verifyUserMiddleware, deleteQuiz);

export default router;
