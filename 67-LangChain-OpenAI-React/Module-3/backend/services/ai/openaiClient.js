import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";

export function createChatModel(options = {}) {
  return new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    modelName: options.modelName || "gpt-4o-mini",
    temperature: options.temperature ?? 0.3,
    maxTokens: options.maxTokens || 300,
  });
}

export function createEmbeddingModel() {
  return new OpenAIEmbeddings({
    apiKey: process.env.OPENAI_API_KEY,
  });
}