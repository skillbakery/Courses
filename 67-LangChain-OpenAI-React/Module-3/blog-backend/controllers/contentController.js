import { runContentPipeline } from "../services/ai/contentPipelineService.js";

export async function generateContent(req, res) {

  try {

    const { topic } = req.body;

    const result = await runContentPipeline(topic);

    res.json(result);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Content pipeline failed"
    });

  }

}