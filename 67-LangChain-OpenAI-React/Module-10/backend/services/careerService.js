import { v4 as uuid } from "uuid";

import {
  getPromptVersion,
} from "./promptService.js";

import {
  invokeModel,
} from "./modelService.js";

import {
  logInteraction,
} from "./monitoringService.js";

import {
  recordRequest,
} from "./analyticsService.js";

export async function generateCareerAdvice(
  question
) {

  const requestId = uuid();

  const {
    version,
    prompt,
  } = getPromptVersion();

  recordRequest(version);

  const startTime = Date.now();

  const response =
    await invokeModel([
      {
        role: "system",
        content: prompt,
      },
      {
        role: "user",
        content: question,
      },
    ]);

  const latency =
    Date.now() - startTime;

  const usage =
    response.response_metadata?.usage ||
    {};

  logInteraction({
    requestId,
    version,
    model:
      process.env.PRIMARY_MODEL,
    question,
    latency,
    tokens:
      usage.total_tokens || 0,
  });

  return {
    requestId,
    version,
    response:
      response.content,
  };
}