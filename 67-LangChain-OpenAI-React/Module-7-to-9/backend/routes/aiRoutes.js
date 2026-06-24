import express from "express";
import { safeAIHandler,analyzeResume  } from "../controllers/aiController.js";

const router = express.Router();

/**
 * Secure AI Route
 */
router.post("/chat", safeAIHandler);
router.post("/resume", analyzeResume);

export default router;