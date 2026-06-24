import express from "express";
import { handleAgent } from "../controllers/agentController.js";

const router = express.Router();

router.post("/agent", handleAgent);

export default router;