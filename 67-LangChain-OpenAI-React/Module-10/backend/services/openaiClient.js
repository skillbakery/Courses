import { ChatOpenAI } from "@langchain/openai";

let primaryModel;
let fallbackModel;

/**
 * Primary model
 * Used for most requests
 */
export function getPrimaryModel() {
  if (!primaryModel) {
    primaryModel = new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      model: process.env.PRIMARY_MODEL,
      temperature: parseFloat(
        process.env.TEMPERATURE || "0.7"
      ),
      maxTokens: parseInt(
        process.env.MAX_TOKENS || "500"
      ),
    });

    console.log(
      `✅ Primary model initialized: ${process.env.PRIMARY_MODEL}`
    );
  }

  return primaryModel;
}

/**
 * Fallback model
 * Used when primary model fails
 */
export function getFallbackModel() {
  if (!fallbackModel) {
    fallbackModel = new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      model: process.env.FALLBACK_MODEL,
      temperature: parseFloat(
        process.env.TEMPERATURE || "0.7"
      ),
      maxTokens: parseInt(
        process.env.MAX_TOKENS || "500"
      ),
    });

    console.log(
      `✅ Fallback model initialized: ${process.env.FALLBACK_MODEL}`
    );
  }

  return fallbackModel;
}

/**
 * Optional startup validation
 * Call once from index.js
 */
export function validateAIConfiguration() {
  const required = [
    "OPENAI_API_KEY",
    "PRIMARY_MODEL",
    "FALLBACK_MODEL",
  ];

  const missing = required.filter(
    (key) => !process.env[key]
  );

  if (missing.length) {
    throw new Error(
      `Missing environment variables: ${missing.join(", ")}`
    );
  }

  console.log("AI configuration validated");
  console.log(
    `Primary Model : ${process.env.PRIMARY_MODEL}`
  );
  console.log(
    `Fallback Model: ${process.env.FALLBACK_MODEL}`
  );
}