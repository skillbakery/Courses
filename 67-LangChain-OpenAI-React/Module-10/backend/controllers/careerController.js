import {
  generateCareerAdvice,
} from "../services/careerService.js";

import {
  saveFeedback,
} from "../services/feedbackService.js";

import {
  getAnalyticsData,
} from "../services/analyticsService.js";

export async function getCareerAdvice(req, res) {
  try {
    const { question } = req.body;

    const result =
      await generateCareerAdvice(question);

    res.json(result);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });
  }
}

export async function submitFeedback(req, res) {

  const { requestId, version, liked } =
    req.body;

  saveFeedback({
    requestId,
    version,
    liked,
  });

  res.json({
    success: true,
  });
}

export async function getAnalytics(req, res) {

  res.json(
    getAnalyticsData()
  );
}