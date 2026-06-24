import { generateChatResponse } from "../services/ai/chatService.js";

export async function chatController(req, res) {
  const { message, sessionId } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const result = await generateChatResponse(
      message,
      sessionId || "guest"
    );

    res.json(result);
  } catch (error) {
    console.error("AI ERROR:", error);
    res.status(500).json({ error: "AI request failed" });
  }
}