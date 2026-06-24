import { createRequire } from "module";
const require = createRequire(import.meta.url);

const { PDFParse } = require("pdf-parse");

/**
 * Extract text from PDF buffer
 */
export async function extractTextFromPDF(fileBuffer) {
  // Create a new instance of the parser
  const parser = new PDFParse({
    data: fileBuffer   // Pass the buffer via options
  });

  // Call getText() on the parser instance
  const result = await parser.getText();

  return result.text;   // This contains the extracted text
}