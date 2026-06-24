import { getChatModel } from "./openaiClient.js";
import { tools } from "../tools/index.js";

export async function runAgent(prompt) {
  const model = getChatModel();

  // 🧠 Step 1: Ask LLM what to do
  const decision = await model.invoke([
    {
      role: "system",
      content: `
              You are an AI agent.

              You have access to the following tools:

              1. calculate
              - Performs mathematical calculations
              - Input: { "expression": "string" }

              2. getWeather
              - Fetches weather for a city
              - Input: { "city": "string" }

              Your job:
              - Decide if a tool is needed
              - If yes, return ONLY JSON:
              {
                "tool": "toolName",
                "arguments": {}
              }
              - If no tool is needed, respond normally

              IMPORTANT:
              - Do NOT explain tool usage
              - Do NOT mix JSON with text
              `,
    },
    {
      role: "user",
      content: prompt,
    },
  ]);

  let parsed;

  try {
    parsed = JSON.parse(decision.content);
    console.log(parsed);
  } catch {
    // No tool → normal response
    return decision.content;
  }

  // 🛠️ Step 2: Execute Tool
  const toolFn = tools[parsed.tool];

  if (!toolFn) {
    return "Unknown tool requested";
  }

  const toolResult = toolFn(parsed.arguments);

  // 🧠 Step 3: Send result back to LLM
  const finalResponse = await model.invoke([
    {
      role: "system",
      content: "Use the tool result to answer the user clearly.",
    },
    {
      role: "user",
      content: prompt,
    },
    {
      role: "assistant",
      content: `Tool result: ${toolResult}`,
    },
  ]);

  return finalResponse.content;
}
