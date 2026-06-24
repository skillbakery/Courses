import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { getChatModel } from "./openaiClient.js";

export async function generateBlogPost(topic) {

  const model = getChatModel();

  /**
   * Define structured output schema
   */

  const parser = StructuredOutputParser.fromNamesAndDescriptions({
    title: "Title of the blog post",
    summary: "Short summary of the blog post",
    keywords: "Array of 3 related keywords"
  });

  /**
   * Get formatting instructions
   */

  const formatInstructions = parser.getFormatInstructions();

  /**
   * Prompt template
   */

  const prompt = ChatPromptTemplate.fromTemplate(
`Generate a short blog post structure about the topic: {topic}

{formatInstructions}`
  );

  /**
   * Create chain
   */

  const chain = prompt.pipe(model);

  /**
   * Call AI
   */

  const response = await chain.invoke({
    topic,
    formatInstructions
  });

  /**
   * Parse structured output
   */

  const parsedOutput = await parser.parse(response.content);

  return parsedOutput;

}