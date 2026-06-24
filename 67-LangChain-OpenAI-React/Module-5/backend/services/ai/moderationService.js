/**
 * Basic prompt injection guard
 */
export function isSafePrompt(prompt) {

  const bannedPatterns = [
    "ignore previous instructions",
    "reveal system prompt",
    "bypass security",
  ];

  const lower = prompt.toLowerCase();

  return !bannedPatterns.some(p => lower.includes(p));
}