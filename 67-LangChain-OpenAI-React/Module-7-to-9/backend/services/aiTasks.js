import { getChatModel } from "./openaiClient.js";

const model = getChatModel();

export async function getExplanation(prompt) {
  const res = await model.invoke([
    { role: "user", content: `Explain: ${prompt}` },
  ]);
  return res.content;
}

export async function getKeyPoints(prompt) {
  const res = await model.invoke([
    { role: "user", content: `Give key points for: ${prompt}` },
  ]);
  return res.content;
}

export async function getExample(prompt) {
  const res = await model.invoke([
    { role: "user", content: `Give an example of: ${prompt}` },
  ]);
  return res.content;
}