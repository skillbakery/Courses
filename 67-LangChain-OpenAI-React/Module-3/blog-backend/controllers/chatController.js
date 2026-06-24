import { handleChatMessage } from "../services/ai/memoryChatService.js";

export async function chatMessage(req, res) {

  try {

    const { sessionId, message } = req.body;

    const reply = await handleChatMessage(sessionId, message);

    res.json(reply);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Chat failed"
    });

  }

}