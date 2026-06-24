//const cache = new Map();
import client from "./redisClient.js";
/**
 * Get from cache
 */
export async function getCache(key) {
  //return cache.get(key);
  return await client.get(key);
}

/**
 * Set cache with TTL
 */
export async function setCache(key, value, ttl = 300) {
  // cache.set(key, value);

  // setTimeout(() => {
  //   cache.delete(key);
  // }, ttl * 1000);

  await client.set(key, value, {
    EX: ttl,
  });
}
