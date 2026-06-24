import { extractTextFromPDF } from "../services/pdfService.js";
import { storePDF } from "../services/ai/pdfVectorService.js";
import { askPDF } from "../services/ai/pdfRagService.js";

/**
 * Upload PDF
 */
export async function uploadPDF(req, res) {

  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const text = await extractTextFromPDF(file.buffer);

    await storePDF(text);

    res.json({ message: "PDF processed successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "PDF processing failed" });
  }
}

/**
 * Ask questions
 */
export async function askFromPDF(req, res) {

  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question required" });
  }

  try {
    const result = await askPDF(question);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Query failed" });
  }
}