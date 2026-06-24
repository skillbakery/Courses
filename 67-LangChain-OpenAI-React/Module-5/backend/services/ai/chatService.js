import { getChatModel } from "./openaiClient.js";
import { getCache, setCache } from "../cacheService.js";
import { logger } from "../../utils/logger.js";

/**
 * Cached AI response
 */
export async function getAIResponse(prompt, requestId) {
  const key = prompt.trim().toLowerCase();

  // 1️⃣ Check cache
  const cached = await getCache(key);
  const start = Date.now();
  if (cached) {
    //console.log("CACHE HIT");
    logger.info("Cache HIT", { requestId, key });
    return cached;
  }

  //console.log("CACHE MISS");
  logger.info("Cache MISS", { requestId, key });

  // 2️⃣ Call AI
  const model = getChatModel();

  const response = await model.invoke([{ role: "user", content: prompt }]);

  const duration = Date.now() - start;

  logger.info("AI Response Generated", {
    requestId,
    duration: `${duration}ms`,
  });
  const result = response.content;

  // 3️⃣ Store in cache
  await setCache(key, result, 300); // 5 min TTL

  return result;
}
