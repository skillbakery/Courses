import { runAgent } from "../services/agentService-module-8.js";

export async function handleAgent(req, res) {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt required" });
  }

  const result = await runAgent(prompt);

  res.json({ result });
}