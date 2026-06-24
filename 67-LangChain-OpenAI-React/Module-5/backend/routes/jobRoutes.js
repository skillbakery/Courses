import express from "express";
import { createJob, getJobStatus } from "../controllers/jobController.js";

import { validate } from "../middleware/validateRequest.js";
import { promptSchema } from "../validators/aiValidator.js";
import { aiLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post(
  "/job",
  aiLimiter,
  validate(promptSchema),
  createJob
);
router.get("/job/:id", getJobStatus);

export default router;
