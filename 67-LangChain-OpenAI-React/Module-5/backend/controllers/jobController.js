import { addJob, getJob } from "../services/jobQueue.js";
import { v4 as uuidv4 } from "uuid";
import { isSafePrompt } from "../services/ai/moderationService.js";
/**
 * Create a background AI job
 */
/**
 * Secure Job Creation
 */
export function createJob(req, res) {
  const { prompt } = req.body;

  // ✅ Prompt safety check
  if (!isSafePrompt(prompt)) {
    return res.status(400).json({
      error: "Unsafe prompt detected",
    });
  }

  const jobId = uuidv4();

  addJob({
    id: jobId,
    data: { prompt },
  });

  res.json({
    message: "Job submitted securely",
    jobId,
  });
}

/**
 * Get job status/result
 */
export function getJobStatus(req, res) {
  const { id } = req.params;

  const job = getJob(id);

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  res.json(job);
}
