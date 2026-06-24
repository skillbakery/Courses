const jobs = [];
const results = {};

/**
 * Add job to queue
 */
export function addJob(job) {
  jobs.push(job);
  return job.id;
}

/**
 * Get job by ID
 */
export function getJob(id) {
  return results[id];
}

/**
 * Process jobs continuously
 */
export function startWorker(processJob) {

  setInterval(async () => {

    if (jobs.length === 0) return;

    const job = jobs.shift();

    try {

      results[job.id] = { status: "PROCESSING" };

      const result = await processJob(job.data);

      results[job.id] = {
        status: "COMPLETED",
        result,
      };

    } catch (err) {

      results[job.id] = {
        status: "FAILED",
        error: err.message,
      };
    }

  }, 1000);
}