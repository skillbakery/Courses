import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRoutes from "./routes/aiRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

import { startWorker } from "./services/jobQueue.js";
import { processAIJob } from "./services/ai/jobProcessor.js";

import { requestLogger } from "./middleware/requestLogger.js";
import { responseLogger } from "./middleware/responseLogger.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "Server running" });
});

// Add logging middleware
app.use(requestLogger);
app.use(responseLogger);

app.use("/api", jobRoutes);
app.use("/api/ai", aiRoutes); 
app.use("/cache/", chatRoutes);

//Start background worker
startWorker(processAIJob);
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