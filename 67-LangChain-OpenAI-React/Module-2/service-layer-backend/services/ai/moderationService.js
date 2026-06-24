export async function moderateInput(text) {
  if (!text) return true;

  const normalized = text.toLowerCase().trim();
  const banned = ["kill", "bomb", "suicide"];

  return !banned.some(word => normalized.includes(word));
}