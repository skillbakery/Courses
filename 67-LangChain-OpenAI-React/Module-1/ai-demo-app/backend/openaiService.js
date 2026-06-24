import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";

// Create model
const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0.7,
});

// Prompt template
const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful AI assistant."],
  ["placeholder", "{history}"],
  ["human", "{input}"],
]);

// Chain prompt -> model
const chain = prompt.pipe(model);

// Simple in-memory store per session
const messageHistories = new Map();

// Session resolver
const getSessionHistory = (sessionId) => {
  if (!messageHistories.has(sessionId)) {
    messageHistories.set(sessionId, new InMemoryChatMessageHistory());
  }
  return messageHistories.get(sessionId);
};

// Attach memory
const chainWithHistory = new RunnableWithMessageHistory({
  runnable: chain,
  getMessageHistory: getSessionHistory,
  inputMessagesKey: "input",
  historyMessagesKey: "history",
});

export async function handleChat(message, sessionId = "default") {
  const result = await chainWithHistory.invoke(
    { input: message },
    { configurable: { sessionId } }
  );

  return {
    answer: result.content,
  };
}
