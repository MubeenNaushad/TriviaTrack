// routes/game.routes.js
import express from "express";
import { submitScore } from "../controllers/game.controller.js";
import { verifyUserMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// POST /api/game/submit-score
// Body: { score: Number, gameType: String }
// Protected by your verifyUserMiddleware
router.post(
  "/submit-score",
  verifyUserMiddleware,
  submitScore
);

export default router;
