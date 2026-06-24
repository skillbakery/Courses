import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import blogRoutes from "./routes/blogRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import supportRoutes from "./routes/supportRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import taglineRoutes from "./routes/taglineRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "Server running" });
});

app.use("/api/blog", blogRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/tagline", taglineRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});