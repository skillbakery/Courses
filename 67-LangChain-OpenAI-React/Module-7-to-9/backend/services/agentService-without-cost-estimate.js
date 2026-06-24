import { getChatModel } from "./openaiClient.js";
import { tools } from "../tools/index.js";
import { getExplanation, getKeyPoints, getExample } from "./aiTasks.js";

import { calculateCost } from "../utils/costCalculator.js";
import { logUsage } from "./usageService.js";
import { getTotalCost } from "./usageService.js";
import { checkBudget } from "./budgetService.js";

function extractJSON(text) {
  if (!text || typeof text !== "string") return null;
  let cleaned = text.trim();
  cleaned = cleaned.replace(/```(?:json)?\s*([\s\S]*?)\s*```/gi, "$1").trim();
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (jsonMatch) cleaned = jsonMatch[0];
  return cleaned;
}

export async function runAgent(prompt) {
  const model = getChatModel();
  let messages = [{ role: "user", content: prompt }];

  const MAX_STEPS = 3;

  for (let step = 0; step < MAX_STEPS; step++) {
    const decision = await model.invoke([
      {
        role: "system",
        content: `
            You are a strict tool-using agent.

            Available tools:
            1. calculate - Use for any math or arithmetic question.
            2. getWeather - Use for weather questions.

            Rules:
            - For math/calculation questions, you MUST use the "calculate" tool.
            - Respond with ONLY this JSON format when using a tool:
            {
              "tool": "calculate",
              "arguments": { "expression": "..." }
            }
            - Do NOT answer math questions directly.
            - Only output normal text when no tool is needed.
                    `.trim(),
      },
      ...messages,
    ]);

    console.log("Raw decision.content:", decision.content);

    const cleaned = extractJSON(decision.content);
    let parsed = null;

    if (cleaned) {
      try {
        const temp = JSON.parse(cleaned);
        if (temp && typeof temp === "object" && temp.tool) {
          parsed = temp;
        }
      } catch (_) {}
    }

    // === NO TOOL → use parallel AI ===
    if (!parsed) {
      console.log("No tool needed → switching to parallel mode");

      try {
        const [explanation, points, example] = await Promise.all([
          getExplanation(prompt),
          getKeyPoints(prompt),
          getExample(prompt),
        ]);
        return `${explanation}\n\nKey Points:\n${points}\n\nExample:\n${example}`;
      } catch (err) {
        return decision.content;
      }
    }

    // === TOOL CASE ===
    console.log("Tool call detected:", parsed);

    const toolFn = tools[parsed.tool];
    if (!toolFn) {
      return `Unknown tool: ${parsed.tool}`;
    }

    let toolResult;
    try {
      toolResult = await toolFn(parsed.arguments || {});
    } catch (err) {
      console.error("Tool execution failed:", err);
      return "Tool execution failed";
    }

    // FIX: After tool executes, return the result directly
    // (or you can format it nicely here)
    console.log("Tool result:", toolResult);
    return toolResult; // ← Return here instead of continuing loop
  }

  return "Could not complete within step limit.";
}
