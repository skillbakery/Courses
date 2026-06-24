import { ChatPromptTemplate } from "@langchain/core/prompts";
import { getChatModel } from "./openaiClient.js";

export async function generateTaglineLangChain(product) {

  const model = getChatModel();

  const prompt = ChatPromptTemplate.fromTemplate(
    "Write a short tagline for: {product}"
  );

  const chain = prompt.pipe(model);

  const response = await chain.invoke({
    product
  });

  return response.content;

}