import express from "express";
import { handleSupport } from "../controllers/supportController.js";

const router = express.Router();

router.post("/ask", handleSupport);

export default router;