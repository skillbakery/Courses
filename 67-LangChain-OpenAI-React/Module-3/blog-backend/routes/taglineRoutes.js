import express from "express";
import {
  generateTaglineRaw,
  generateTaglineLC
} from "../controllers/taglineController.js";

const router = express.Router();

router.post("/raw", generateTaglineRaw);
router.post("/langchain", generateTaglineLC);

export default router;