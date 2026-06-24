import { v4 as uuidv4 } from "uuid";
import { logger } from "../utils/logger.js";

/**
 * Logs every incoming request
 */
export function requestLogger(req, res, next) {

  const requestId = uuidv4();

  req.requestId = requestId;

  logger.info("Incoming request", {
    requestId,
    method: req.method,
    url: req.url,
    body: req.body,
  });

  next();
}