import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import agentRoutes from "./routes/agentRoute.js";
import aiRoutes from "./routes/aiRoutes.js";

import { requestLogger } from "./middleware/requestLogger.js";
import rateLimit from "express-rate-limit";

dotenv.config();
const app = express();
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
});

app.use(cors());
app.use(express.json());
app.use("/api", limiter);
app.use(requestLogger);

app.get("/health", (req, res) => {
  res.json({ status: "Server running" });
});


app.use("/api", agentRoutes);
app.use("/api/ai", aiRoutes);
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); 
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
  } else {
    console.error('Server error:', err);
  }
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});