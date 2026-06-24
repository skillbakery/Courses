import rateLimit from "express-rate-limit";

/**
 * Limit API usage
 */
export const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,             // 10 requests per minute
  message: "Too many requests, please try again later",
});