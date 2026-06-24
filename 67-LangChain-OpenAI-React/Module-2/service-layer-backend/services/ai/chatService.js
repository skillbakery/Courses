import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createChatModel } from "./openaiClient.js";
import { moderateInput } from "./moderationService.js";
import { retrieveContext } from "./ragService.js";

export async function generateChatResponse(message, sessionId) {
  // 1️⃣ Moderation
  const safe = await moderateInput(message);
  if (!safe) {
    return { reply: "Message blocked by moderation.", sessionId };
  }

  // 2️⃣ Retrieval
  const contextDocs = await retrieveContext(message);

  // 3️⃣ Model (can dynamically configure here)
  const chatModel = createChatModel({
    temperature: 0.3,
    maxTokens: 200,
  });

  // 4️⃣ Prompt
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a helpful support assistant."],
    [
      "system",
      `Use only the following context:\n${contextDocs.join("\n")}`,
    ],
    ["human", "{input}"],
  ]);

  const chain = prompt.pipe(chatModel);

  const response = await chain.invoke({
    input: message,
  });

  return {
    reply: response.content,
    sessionId,
    contextUsed: contextDocs,
  };
}