import { getChatModel } from "./openaiClient.js";

/**
 * Streaming using LangChain
 */
// export async function streamAIResponse(prompt, onChunk) {

//   const model = getChatModel();

//   const stream = await model.stream([
//     { role: "user", content: prompt }
//   ]);

//   for await (const chunk of stream) {

//     const content = chunk.content;

//     if (content) {
//       onChunk(content);
//     }
//   }

//   onChunk("[DONE]");
// }

export async function streamAIResponse(messages, onChunk) {

  const model = getChatModel();

  // ✅ Pass the messages array directly (this is the conversation history)
  const stream = await model.stream(messages);

  for await (const chunk of stream) {
    const content = chunk.content;   // or chunk.content?.[0]?.text depending on your model lib

    if (content) {
      onChunk(content);
    }
  }

  onChunk("[DONE]");
}