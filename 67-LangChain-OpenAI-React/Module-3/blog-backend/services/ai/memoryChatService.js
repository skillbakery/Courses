import { ChatPromptTemplate } from "@langchain/core/prompts";
import { getChatModel } from "./openaiClient.js";

const sessions = {};

export async function handleChatMessage(sessionId, message) {

  const model = getChatModel();

  /**
   * Initialize session memory
   */

  if (!sessions[sessionId]) {
    sessions[sessionId] = [];
  }

  const history = sessions[sessionId];

  /**
   * Add user message
   */

  history.push({
    role: "user",
    content: message
  });

  /**
   * Convert history into prompt text
   */

  const conversation = history
    .map(m => `${m.role}: ${m.content}`)
    .join("\n");

  const prompt = ChatPromptTemplate.fromTemplate(`
You are a helpful assistant.

Conversation history:
{conversation}

User: {message}
`);

  const chain = prompt.pipe(model);

  const response = await chain.invoke({
    conversation,
    message
  });

  /**
   * Store AI reply
   */

  history.push({
    role: "assistant",
    content: response.content
  });

  return {
    reply: response.content,
    sessionId
  };

}