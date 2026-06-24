import { createEmbeddingModel } from "./openaiClient.js";

const embeddings = createEmbeddingModel();

const docs = [
  "Our refund policy allows refunds within 30 days.",
  "We offer 24/7 customer support via chat.",
  "Users can upgrade their plan anytime.",
  "Subscriptions are billed monthly.",
];

let embeddedDocs = [];
let prepared = false;

function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, v, i) => sum + v * b[i], 0);
  const magA = Math.sqrt(a.reduce((s, v) => s + v * v, 0));
  const magB = Math.sqrt(b.reduce((s, v) => s + v * v, 0));
  return dot / (magA * magB);
}

async function prepareDocs() {
  if (prepared) return;

  for (const doc of docs) {
    const vector = await embeddings.embedQuery(doc);
    embeddedDocs.push({ text: doc, vector });
  }

  prepared = true;
}

export async function retrieveContext(query) {
  await prepareDocs();

  const queryVector = await embeddings.embedQuery(query);

  const ranked = embeddedDocs.map(d => ({
    ...d,
    score: cosineSimilarity(queryVector, d.vector),
  }));

  ranked.sort((a, b) => b.score - a.score);

  return ranked.slice(0, 2).map(r => r.text);
}