import express from "express";
import { handleSemanticSearch } from "../controllers/embeddingController.js";
import { handleChunkingSearch } from "../controllers/chunkingController.js";
const router = express.Router();

router.post("/search", handleSemanticSearch);
router.post("/chunking", handleChunkingSearch);

export default router;