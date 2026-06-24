import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { handleChat } from "./openaiService.js";

dotenv.config();
console.log("BOOTED INDEX.JS");
const app = express();
// ✅ CORS FIRST
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true,
}));

// ✅ Body parser
app.use(express.json());

// ✅ HEALTH CHECK
app.get("/health", (req, res) => {
  console.log("HIT /health");
  res.json({ status: "ok" });
});

// ✅ CHAT ROUTE
app.post("/chat", async (req, res) => {
  console.log("HIT /chat");

  const { message, sessionId } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const result = await handleChat(message, sessionId || "guest");
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI request failed" });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Backend running on port ${process.env.PORT || 5000}`);
});
