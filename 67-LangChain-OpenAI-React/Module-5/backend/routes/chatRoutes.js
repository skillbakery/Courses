import express from "express";
import { chat } from "../controllers/chatController.js";

const router = express.Router();

/**
 * POST /cahce/chat
 * Handles AI chat with caching
 */
router.post("/chat", chat);

export default router;