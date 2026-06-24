import express from "express";
import {
  chainDemo,
  toolDemo,
  agentDemo
} from "../controllers/demoController.js";

const router = express.Router();

router.post("/chain", chainDemo);
router.post("/tool", toolDemo);
router.post("/agent", agentDemo);

export default router;