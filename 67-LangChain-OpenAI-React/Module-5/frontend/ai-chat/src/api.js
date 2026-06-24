import axios from "axios";

/**
 * Regular non-streaming call (if needed)
 */
export const sendMessage = async (message) => {
  const res = await axios.post("http://localhost:5000/chat", { message });
  return res.data;
};

/**
 * Streaming API call
 */
export const streamMessage = async (message, onChunk) => {
  const res = await fetch("http://localhost:5000/api/ai/stream", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: message }),
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = ""; 

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n");
    buffer = lines.pop(); // Keep the last incomplete line in buffer

    for (let line of lines) {
      if (line.startsWith("data: ")) {
        let text = line.replace("data: ", "").trim();

        if (text === "[DONE]") {
          return;
        }

        if (text) {
          // Add a space intelligently before appending next chunk
          onChunk(text + " ");
        }
      }
    }
  }

  // Process any remaining buffer
  if (buffer.startsWith("data: ")) {
    let text = buffer.replace("data: ", "").trim();
    if (text && text !== "[DONE]") {
      onChunk(text);
    }
  }
};