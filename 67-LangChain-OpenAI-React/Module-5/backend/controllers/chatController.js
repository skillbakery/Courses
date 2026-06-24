import { getAIResponse } from "../services/ai/chatService.js";

/**
 * Chat Controller (uses cache internally)
 */
export async function chat(req, res) {

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: "Prompt is required",
      });
    }
    console.log(req.requestId);
    const result = await getAIResponse(prompt,req.requestId);

    res.json({
      reply: result,
    });

  } catch (err) {
    console.error("Chat Error:", err);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
}