import { getChatModel } from "./openaiClient.js";

/**
 * AI-based Output Moderation
 */
export async function checkOutputSafety(responseText) {
  const model = getChatModel();

  const result = await model.invoke([
    {
      role: "system",
      content: `
            You are a content moderation system.

            Check if the response contains:
            - Harmful instructions
            - Sensitive data
            - Unsafe or toxic content

            Respond ONLY:
            SAFE or UNSAFE
      `,
    },
    {
      role: "user",
      content: responseText,
    },
  ]);

  return result.content.trim() === "UNSAFE";
}

export function sanitizeResponse(text) {
  // Basic fallback sanitization
  return "⚠️ This response was blocked due to safety concerns.";
}