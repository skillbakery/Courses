import { Chroma } from "@langchain/community/vectorstores/chroma";
import { OpenAIEmbeddings } from "@langchain/openai";
import { splitText } from "./chunkingService.js";

const embeddings = new OpenAIEmbeddings({
  apiKey: process.env.OPENAI_API_KEY,
});

let vectorStore;

/**
 * Store PDF text into vector DB
 */
export async function storePDF(text) {

  const chunks = await splitText(text);

  vectorStore = await Chroma.fromTexts(
    chunks,
    chunks.map((chunk, index) => ({
      id: index,
      source: "pdf-upload",
    })),
    embeddings,
    {
      collectionName: "pdf-docs",
      url: "http://localhost:8000",
    }
  );

  console.log("✅ PDF stored in vector DB");

  return true;
}

/**
 * Search PDF content
 */
export async function searchPDF(query) {

  const results = await vectorStore.similaritySearch(query, 3);

  return results.map(r => r.pageContent);
}