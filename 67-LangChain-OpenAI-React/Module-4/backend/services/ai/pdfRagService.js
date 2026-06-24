import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { searchPDF } from "./pdfVectorService.js";

const model = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-4o-mini",
  temperature: 0.7,
});

export async function askPDF(question) {

  const contextDocs = await searchPDF(question);

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a helpful assistant."],
    [
      "system",
      `Answer ONLY from this PDF context:\n${contextDocs.join("\n")}`,
    ],
    ["human", "{input}"],
  ]);

  const chain = prompt.pipe(model);

  const response = await chain.invoke({
    input: question,
  });

  return {
    answer: response.content,
    contextUsed: contextDocs,
  };
}