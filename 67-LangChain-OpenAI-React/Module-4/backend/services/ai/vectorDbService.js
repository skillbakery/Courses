import { Chroma } from "@langchain/community/vectorstores/chroma";
import { OpenAIEmbeddings } from "@langchain/openai";
import { splitText } from "./chunkingService.js";
import { rawText } from "./knowledgeBase.js";

const embeddings = new OpenAIEmbeddings({
  apiKey: process.env.OPENAI_API_KEY,
});

let vectorStore;

export async function initVectorDB() {
  if (vectorStore) return vectorStore;

  const chunks = await splitText(rawText);

  vectorStore = await Chroma.fromTexts(
  chunks,
  chunks.map((chunk, index) => ({
    id: index,
    source: "knowledge-base",
  })),
  embeddings,
  {
    collectionName: "chunked-docs",
    url: "http://localhost:8000", // assuming server mode
  }
);

  console.log("✅ Chroma local DB initialized");

  return vectorStore;
}
export async function vectorSearch(query) {
  const store = await initVectorDB();

  const results = await store.similaritySearch(query, 2);

  return results.map((r) => ({
    text: r.pageContent,
  }));
}
