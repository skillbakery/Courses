import { semanticSearch } from "../services/ai/embeddingService.js";

export async function handleSemanticSearch(req, res) {

  try {

    const { query } = req.body;

    if (!query) {
      return res.status(400).json({
        error: "Query is required"
      });
    }

    const results = await semanticSearch(query);

    res.json({
      query,
      results
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Semantic search failed"
    });

  }

}