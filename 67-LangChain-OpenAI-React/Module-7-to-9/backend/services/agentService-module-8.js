import { getChatModel } from "./openaiClient.js";
import { tools } from "../tools/index.js";

export async function runAgent(prompt) {
  const model = getChatModel();

  let messages = [{ role: "user", content: prompt }];

  for (let step = 0; step < 5; step++) {
    // 🧠 Ask LLM what to do
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
      ...messages,
    ]);

    let parsed;

    try {
      parsed = JSON.parse(decision.content);
    } catch {
      // Final answer
      return decision.content;
    }

    // Validate tool
    const toolFn = tools[parsed.tool];

    if (!toolFn) {
      return "Unknown tool requested";
    }

    // Execute tool (await important)
    let toolResult;
    try {
      toolResult = await toolFn(parsed.arguments);
    } catch (err) {
      return "Tool execution failed";
    }

    //Feed back into loop (ReAct pattern)
    messages.push({
      role: "assistant",
      content: decision.content,
    });

    messages.push({
      role: "system",
      content: `Tool result: ${toolResult}`,
    });
  }

  return "Max steps reached";
}
