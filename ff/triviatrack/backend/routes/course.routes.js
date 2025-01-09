import express from "express";
import { createcourse } from "../controllers/course.controller.js";
import { verifyUserMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", verifyUserMiddleware, createcourse);

export default router;