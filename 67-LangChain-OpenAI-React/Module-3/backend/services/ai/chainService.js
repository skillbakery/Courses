import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createChatModel } from "./openaiClient.js";

export async function runChainDemo(question) {

  const model = createChatModel();

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a helpful assistant."],
    ["human", "{question}"]
  ]);

  const chain = prompt.pipe(model);

  const response = await chain.invoke({
    question
  });

  return response.content;

}