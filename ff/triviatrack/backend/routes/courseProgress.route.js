import express from "express";
import { verifyUserMiddleware } from "../middleware/auth.middleware.js";
import {
  getCourseProgress,
  updateLectureProgress,
  markAsCompleted,
  markAsInCompleted,
  completeLectureProgress,
} from "../controllers/courseProgress.controller.js";

const router = express.Router();

router.get("/check/:courseId", verifyUserMiddleware, getCourseProgress);
router.post(
  "/:courseId/lecture/:lectureId/view",
  verifyUserMiddleware,
  updateLectureProgress
);
router.post(
  "/:courseId/lecture/:lectureId/complete",
  verifyUserMiddleware,
  completeLectureProgress
);
router.post("/:courseId/complete", verifyUserMiddleware, markAsCompleted);
router.post("/:courseId/incomplete", verifyUserMiddleware, markAsInCompleted);

export default router;
