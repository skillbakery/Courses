import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

/**
 * Chunk large text into smaller pieces
 */
export async function splitText(text) {

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 300,     // size of each chunk
    chunkOverlap: 50,   // overlap between chunks
  });

  const chunks = await splitter.splitText(text);

  return chunks;
}