import { getChatModel } from "./openaiClient.js";

export async function processAIJob(data) {

  const model = getChatModel();

  const response = await model.invoke([
    { role: "user", content: data.prompt }
  ]);

  return response.content;
}