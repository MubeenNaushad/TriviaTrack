import express from "express";
import {
  createCheckoutSession,
  getAllPurchasedCourse,
  getCourseDetailwithPurchase,
  stripeWebhook,
} from "../controllers/coursePurchase.controller.js";
import { verifyUserMiddleware, optionalVerifyUserMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/checkout/create-checkout-session",
  verifyUserMiddleware,
  createCheckoutSession
);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

router.get(
  "/course/:courseId/detail-with-status",
  optionalVerifyUserMiddleware,
  getCourseDetailwithPurchase
);

router.get("/", getAllPurchasedCourse);

export default router;
