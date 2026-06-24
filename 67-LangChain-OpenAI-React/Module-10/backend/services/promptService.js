import {
  PromptA,
  PromptB,
} from "../prompts/promptTemplates.js";

export function getPromptVersion() {

  const random = Math.random();

  if (random < 0.5) {
    return {
      version: "A",
      prompt: PromptA,
    };
  }

  return {
    version: "B",
    prompt: PromptB,
  };
}