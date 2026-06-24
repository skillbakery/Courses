import { OpenAIEmbeddings } from "@langchain/openai";
import { docs } from "./knowledgeBase.js";

/**
 * Embedding model
 */
const embeddings = new OpenAIEmbeddings({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Cache to avoid recomputing embeddings
 */
let embeddedDocs = null;

/**
 * Convert docs → vectors (runs once)
 */
async function embedDocs() {

  if (embeddedDocs) return embeddedDocs;

  const vectors = [];

  for (const doc of docs) {
    const vector = await embeddings.embedQuery(doc);
    vectors.push({ text: doc, vector });
  }

  embeddedDocs = vectors;

  return vectors;
}

/**
 * Cosine similarity
 */
function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, v, i) => sum + v * b[i], 0);
  const magA = Math.sqrt(a.reduce((s, v) => s + v * v, 0));
  const magB = Math.sqrt(b.reduce((s, v) => s + v * v, 0));

  return dot / (magA * magB);
}

/**
 * Semantic Search (MAIN EXPORT)
 */
export async function semanticSearch(query) {

  const embeddedDocs = await embedDocs();

  const queryVector = await embeddings.embedQuery(query);

  const ranked = embeddedDocs.map(doc => ({
    ...doc,
    score: cosineSimilarity(queryVector, doc.vector),
  }));

  ranked.sort((a, b) => b.score - a.score);

  return ranked.slice(0, 2);
}