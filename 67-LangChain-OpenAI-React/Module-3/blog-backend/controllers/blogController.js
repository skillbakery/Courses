import { generateBlogPost } from "../services/ai/blogGeneratorService.js";

export async function generateBlog(req, res) {

  try {

    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({
        error: "Topic is required"
      });
    }

    const blog = await generateBlogPost(topic);

    res.json(blog);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Blog generation failed"
    });

  }

}