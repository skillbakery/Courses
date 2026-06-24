import { routeSupportQuestion } from "../services/ai/supportRouterService.js";

export async function handleSupport(req, res) {

  try {

    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        error: "Question is required"
      });
    }

    const result = await routeSupportQuestion(question);

    res.json(result);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Support router failed"
    });

  }

}