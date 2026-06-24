import express from "express";
import { askNoRag, askWithRag } from "../controllers/ragController.js";

const router = express.Router();

router.post("/no-rag", askNoRag);
router.post("/with-rag", askWithRag);

export default router;