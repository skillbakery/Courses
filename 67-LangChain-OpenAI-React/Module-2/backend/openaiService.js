import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

/**
 * -------------------------------
 * Model Configuration
 * -------------------------------
 * We initialize our Chat model and Embedding model once
 * and reuse them across requests.
 */

const chatModel = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-4o-mini",
  temperature: 0.7,
});

const embeddings = new OpenAIEmbeddings({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * -------------------------------
 * Demo Knowledge Base (Docs)
 * -------------------------------
 * These simulate internal company documents.
 */

const docs = [
  "Our refund policy allows refunds within 30 days.",
  "We offer 24/7 customer support via chat.",
  "Users can upgrade their plan anytime.",
  "Subscriptions are billed monthly.",
];

// Stores embedded documents in memory
let embeddedDocs = [];
let docsPrepared = false;

/**
 * -------------------------------
 * Moderation Layer
 * -------------------------------
 * Runs before AI sees user input.
 * In production this would call OpenAI moderation API.
 */

async function moderateInput(text) {
  if (!text) return true;

  const normalized = text.toLowerCase().trim();
  const banned = ["kill", "bomb", "suicide"];

  return !banned.some(word => normalized.includes(word));
}

/**
 * -------------------------------
 * Prepare Embeddings
 * -------------------------------
 * Converts documents into vectors once.
 */

async function prepareDocs() {
  if (docsPrepared) return;

  for (const doc of docs) {
    const vector = await embeddings.embedQuery(doc);
    embeddedDocs.push({ text: doc, vector });
  }

  docsPrepared = true;
}

/**
 * -------------------------------
 * Cosine Similarity
 * -------------------------------
 * Measures how close two vectors are.
 */

function cosineSimilarity(a, b) {
  if (!a || !b || a.length !== b.length) return 0;

  const dot = a.reduce((sum, v, i) => sum + v * b[i], 0);
  const magA = Math.sqrt(a.reduce((s, v) => s + v * v, 0));
  const magB = Math.sqrt(b.reduce((s, v) => s + v * v, 0));

  if (magA === 0 || magB === 0) return 0;

  return dot / (magA * magB);
}

/**
 * -------------------------------
 * Semantic Search
 * -------------------------------
 * Finds most relevant docs using embeddings.
 */

async function searchDocs(query) {
  await prepareDocs();

  const queryVector = await embeddings.embedQuery(query);

  const ranked = embeddedDocs.map(d => ({
    ...d,
    score: cosineSimilarity(queryVector, d.vector),
  }));

  ranked.sort((a, b) => b.score - a.score);

  return ranked.slice(0, 2).map(r => r.text);
}

/**
 * -------------------------------
 * Main Chat Handler
 * -------------------------------
 * This is what your API route calls.
 */

export async function handleChat(message, sessionId) {
  try {
    // 1️⃣ Moderation
    const safe = await moderateInput(message);
    if (!safe) {
      return { reply: "Message blocked by moderation.", sessionId };
    }

    // 2️⃣ Retrieval (RAG)
    const contextDocs = await searchDocs(message);

    // 3️⃣ Prompt Construction
    const prompt = ChatPromptTemplate.fromMessages([
      ["system", "You are a helpful support assistant."],
      [
        "system",
        `Use the following context to answer:\n${contextDocs.join("\n")}`,
      ],
      ["human", "{input}"],
    ]);

    // 4️⃣ Chain Creation
    const chain = prompt.pipe(chatModel);

    // 5️⃣ Invocation
    const response = await chain.invoke({
      input: message,
    });

    return {
      reply: response.content,
      sessionId,
      contextUsed: contextDocs,
    };
  } catch (error) {
    console.error("AI Error:", error);

    return {
      reply: "Something went wrong while processing your request.",
      sessionId,
    };
  }
}
