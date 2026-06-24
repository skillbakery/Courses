import { getChatModel } from "./openaiClient.js";
import { tools } from "../tools/index.js";
import { getExplanation, getKeyPoints, getExample } from "./aiTasks.js";

import { calculateCost } from "../tools/costCalculator.js";
import { logUsage, getTotalCost } from "./usageService.js";
import { checkBudget } from "./budgetService.js";

function extractJSON(text) {
  if (!text || typeof text !== "string") return null;
  let cleaned = text.trim();
  cleaned = cleaned.replace(/```(?:json)?\s*([\s\S]*?)\s*```/gi, "$1").trim();
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (jsonMatch) cleaned = jsonMatch[0];
  return cleaned;
}

export async function runAgent(prompt, requestId = "unknown") {
  const model = getChatModel();
  let messages = [{ role: "user", content: prompt }];

  const MAX_STEPS = 3;

  //Track total tokens across ALL calls
  let totalTokensUsed = 0;

  for (let step = 0; step < MAX_STEPS; step++) {
    const decision = await model.invoke([
      {
        role: "system",
        content: `
          You are a strict tool-using agent.

          Available tools:
          1. calculate
          2. getWeather

          Rules:
          - Use calculate for math
          - Respond ONLY JSON for tool calls:
          {
            "tool": "calculate",
            "arguments": { "expression": "..." }
          }
          - Otherwise respond normally
        `.trim(),
      },
      ...messages,
    ]);

    // Track decision tokens
    const decisionUsage = decision.response_metadata?.usage || {};
    totalTokensUsed += decisionUsage.total_tokens || 0;

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

    // =========================================================
    // NO TOOL → PARALLEL EXECUTION
    // =========================================================
    if (!parsed) {
      console.log("No tool → parallel mode");

      try {
        const results = await Promise.all([
          getExplanation(prompt),
          getKeyPoints(prompt),
          getExample(prompt),
        ]);

        const [explanation, points, example] = results;

        // ⚠️ NOTE:
        // If aiTasks internally use LLM → ideally they should return usage too
        // For now assume approx tokens OR extend them later

        // 👉 OPTIONAL: estimate tokens (fallback)
        const approxTokens = explanation.length + points.length + example.length;
        totalTokensUsed += Math.ceil(approxTokens / 4); // rough estimate

        const finalOutput = `${explanation}

Key Points:
${points}

Example:
${example}`;

        // Cost Calculation
        const cost = calculateCost(totalTokensUsed);

        // Logging
        logUsage({
          tokens: totalTokensUsed,
          cost,
          requestId,
        });

        // Budget Check
        const totalCost = getTotalCost();
        if (checkBudget(totalCost)) {
          return "Budget exceeded. Please try later.";
        }

        return finalOutput;

      } catch (err) {
        console.error("Parallel execution failed:", err);
        return decision.content;
      }
    }

    // =========================================================
    // TOOL EXECUTION
    // =========================================================
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

    console.log("Tool result:", toolResult);

    // Cost Calculation AFTER tool flow
    const cost = calculateCost(totalTokensUsed);

    logUsage({
      tokens: totalTokensUsed,
      cost,
      requestId,
    });

    const totalCost = getTotalCost();
    if (checkBudget(totalCost)) {
      return "Budget exceeded. Please try later.";
    }

    return toolResult;
  }

  return "Could not complete within step limit.";
}