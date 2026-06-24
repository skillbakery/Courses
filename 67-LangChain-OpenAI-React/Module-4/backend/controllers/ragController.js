import { askWithoutRag } from "../services/ai/noRagService.js";
import { askWithRagService } from "../services/ai/ragDemoService.js";

export async function askNoRag(req, res) {
  const { question } = req.body;

  const answer = await askWithoutRag(question);

  res.json({
    type: "no-rag",
    answer
  });
}

export async function askWithRag(req, res) {
  const { question } = req.body;

  const result = await askWithRagService(question);

  res.json({
    type: "with-rag",
    ...result
  });
}