import { ChatPromptTemplate } from "@langchain/core/prompts";
import { getChatModel } from "./openaiClient.js";

export async function askWithoutRag(question) {
  const model = getChatModel();

  const prompt = ChatPromptTemplate.fromTemplate(`
You are a helpful assistant.

Answer the question:

{question}
`);

  const chain = prompt.pipe(model);

  const response = await chain.invoke({ question });

  return response.content;
}
