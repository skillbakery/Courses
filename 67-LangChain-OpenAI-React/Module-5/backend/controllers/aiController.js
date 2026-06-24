import { streamAIResponse } from "../services/ai/streamService.js";

/**
 * Streaming endpoint (SSE)
 */
// export async function streamResponse(req, res) {

//   const { prompt } = req.body;

//   if (!prompt) {
//     return res.status(400).json({ error: "Prompt is required" });
//   }

//   // ✅ SSE headers
//   res.setHeader("Content-Type", "text/event-stream");
//   res.setHeader("Cache-Control", "no-cache");
//   res.setHeader("Connection", "keep-alive");

//   try {

//     await streamAIResponse(prompt, (chunk) => {

//       res.write(`data: ${chunk}\n\n`);

//       if (chunk === "[DONE]") {
//         res.end();
//       }
//     });

//   } catch (err) {
//     console.error("Streaming Error:", err);

//     res.write(`data: Error occurred\n\n`);
//     res.end();
//   }
// }
/**
 * Streaming endpoint (SSE)
 */
export async function streamResponse(req, res) {

  const { prompt } = req.body;

  if (!prompt || !prompt.length) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  // ✅ Force correct OpenAI content format (no double-wrapping)
  const formattedMessages = prompt.map((msg) => {
    let content = msg.content;

    if (Array.isArray(content)) {
      // Ensure every item in the array has {type, text}
      content = content.map(item => {
        if (typeof item === "string") {
          return { type: "text", text: item };
        }
        if (item && item.type) {
          return item;                    // already correct
        }
        return { type: "text", text: String(item || "") };
      });
    } else {
      content = [{
        type: "text",
        text: typeof content === "string" ? content : String(content || ""),
      }];
    }

    return {
      role: msg.role,
      content: content,
    };
  });

  console.log("FINAL messages sent to AI:", 
    JSON.stringify(formattedMessages, null, 2));

  // ✅ SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    await streamAIResponse(formattedMessages, (chunk) => {
      res.write(`data: ${chunk}\n\n`);

      if (chunk === "[DONE]") {
        res.end();
      }
    });
  } catch (err) {
    console.error("Streaming Error:", err);
    res.write(`data: Error occurred\n\n`);
    res.end();
  }
}