import { docs } from "./knowledgeBase.js";

/**
 * Simple keyword-based retrieval
 * (used for early RAG demo comparison)
 */
export function retrieveDocs(question) {

  const q = question.toLowerCase();

  return docs.filter(doc =>
    doc.toLowerCase().includes("refund")
  );

}