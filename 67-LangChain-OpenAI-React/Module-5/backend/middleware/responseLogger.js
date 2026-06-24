import { logger } from "../utils/logger.js";

/**
 * Logs response time
 */
export function responseLogger(req, res, next) {

  const start = Date.now();

  res.on("finish", () => {

    const duration = Date.now() - start;

    logger.info("Request completed", {
      requestId: req.requestId,
      status: res.statusCode,
      duration: `${duration}ms`,
    });
  });

  next();
}