//import { detectPromptInjection, validatePrompt } from "../services/securityService.js";
import {
  detectInjectionWithAI,
  validatePrompt,
} from "../services/securityService.js";
import { runAgent } from "../services/agentService.js";
import { v4 as uuidv4 } from "uuid";

import {
  checkOutputSafety,
  sanitizeResponse,
} from "../services/moderationService.js";

export async function safeAIHandler(req, res) {
  // Safe destructuring (prevents crash if body undefined)
  const { prompt = "" } = req.body || {};

  const MAX_INPUT_CHARS = 500;

  // Always work with trimmed prompt
  const trimmedPrompt =
    prompt.length > MAX_INPUT_CHARS
      ? prompt.slice(0, MAX_INPUT_CHARS)
      : prompt;

  const userId = req.headers["x-user-id"] || "anonymous";

  console.log("[AI FLOW]", {
    requestId: req.requestId,
    userId,
    prompt,
  });

  // Step 1: Validate input
  const validation = validatePrompt(trimmedPrompt);

  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  // Step 2: Detect injection
  //  Earlier you were using raw prompt → inconsistent
  const isInjection = await detectInjectionWithAI(trimmedPrompt);

  console.log("Prompt:", trimmedPrompt);
  console.log("Injection Result:", isInjection);

  if (isInjection) {
    return res.status(403).json({
      error: "Potential prompt injection detected",
    });
  }

  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), 10000)
    );

    // Step 3: Call Agent
    //const result = await runAgent(prompt);  old
    const result = await Promise.race([
      runAgent(trimmedPrompt),
      timeoutPromise,
    ]);

    // Step 4: Output Moderation
    const isUnsafeOutput = await checkOutputSafety(result);

    if (isUnsafeOutput) {
      const safeText = sanitizeResponse(result);

      return res.json({
        result: safeText,
        flagged: true,
      });
    }

    // Step 5: Limit output size
    const MAX_OUTPUT_CHARS = 1000;

    const finalResult =
      result.length > MAX_OUTPUT_CHARS
        ? result.slice(0, MAX_OUTPUT_CHARS) + "..."
        : result;

    // Consistent response key
    return res.json({
      result: finalResult,
      flagged: false,
    });

  } catch (err) {
    console.error("AI Error:", err);

    res.status(500).json({
      error: "AI processing failed",
    });
  }
}

export async function analyzeResume(req, res) {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt required" });
  }

  const requestId = uuidv4();

  const result = await runAgent(prompt, requestId);

  res.json({
    requestId,
    result,
  });
}