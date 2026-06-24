import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import ragRoutes from "./routes/ragRoutes.js";
import embeddingRoutes from "./routes/embeddingRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "Server running" });
});

app.use("/api/ask", ragRoutes);
app.use("/api/embedding", embeddingRoutes);
app.use("/api/pdf", pdfRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});