import { v4 as uuidv4 } from "uuid";

export function requestLogger(req, res, next) {
  req.requestId = uuidv4();

  console.log("[INFO] Incoming request", {
    requestId: req.requestId,
    method: req.method,
    url: req.url,
    body: req.body,
  });

  const start = Date.now();

  res.on("finish", () => {
    console.log("[INFO] Request completed", {
      requestId: req.requestId,
      status: res.statusCode,
      duration: `${Date.now() - start}ms`,
    });
  });

  next();
}