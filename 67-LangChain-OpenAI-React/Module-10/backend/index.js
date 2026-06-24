import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import careerRoutes
  from "./routes/careerRoutes.js";
import { validateAIConfiguration } from "./services/openaiClient.js";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

dotenv.config({
  path: envFile,
});

console.log(`Loaded environment: ${envFile}`);

validateAIConfiguration();
const app = express();

app.use(express.json());

app.use(
  "/api/career",
  careerRoutes
);

app.listen(5000, () => {

  console.log(
    "Server Started"
  );
});