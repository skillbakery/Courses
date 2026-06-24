import express from "express";
import { upload } from "../middlewares/upload.js";
import { uploadPDF, askFromPDF } from "../controllers/pdfController.js";

const router = express.Router();

router.post("/upload-pdf", upload.single("file"), uploadPDF);
router.post("/ask-pdf", askFromPDF);

export default router;