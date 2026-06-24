import { z } from "zod";

/**
 * Validate AI request input
 */
export const promptSchema = z.object({
  prompt: z
    .string()
    .min(3, "Prompt too short")
    .max(500, "Prompt too long"),
});