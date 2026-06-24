// Approx pricing (example)
const PRICE_PER_1K_TOKENS = 0.00015; // adjust as per model

export function calculateCost(totalTokens) {
  return (totalTokens / 1000) * PRICE_PER_1K_TOKENS;
}