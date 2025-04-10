import express from "express";
import {
  createFinancialAidApplication,
  getAllFinancialAidApplications,
  getSpecificAid,
  updateFinancialAidApplication,
} from "../controllers/financialAid.controller.js";
import { verifyUserMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/sendaidapp", verifyUserMiddleware, createFinancialAidApplication);

router.put(
  "/update-aid/:appId",
  updateFinancialAidApplication
);

router.get("/get-all-aids", getAllFinancialAidApplications);

router.get("/get-specific-aid/:appId", getSpecificAid);

export default router;
