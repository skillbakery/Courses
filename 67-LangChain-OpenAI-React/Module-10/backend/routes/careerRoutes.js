import express from "express";

import {
  getCareerAdvice,
  submitFeedback,
  getAnalytics,
} from "../controllers/careerController.js";

const router = express.Router();

router.post("/advice", getCareerAdvice);

router.post("/feedback", submitFeedback);

router.get("/analytics", getAnalytics);

export default router;