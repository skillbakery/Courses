import express from "express";
import { streamResponse } from "../controllers/aiController.js";

const router = express.Router();

router.post("/stream", streamResponse);

export default router;