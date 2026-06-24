import { ChatPromptTemplate } from "@langchain/core/prompts";
import { getChatModel } from "./openaiClient.js";

export async function runContentPipeline(topic) {

  const model = getChatModel();

  /**
   * Step 1 — Generate Title
   */

  const titlePrompt = ChatPromptTemplate.fromTemplate(
    "Generate a catchy blog title about {topic}"
  );

  const titleChain = titlePrompt.pipe(model);

  const titleResponse = await titleChain.invoke({ topic });

  const title = titleResponse.content;


  /**
   * Step 2 — Generate Summary
   */

  const summaryPrompt = ChatPromptTemplate.fromTemplate(
    "Write a short blog summary for the title: {title}"
  );

  const summaryChain = summaryPrompt.pipe(model);

  const summaryResponse = await summaryChain.invoke({
    title
  });

  const summary = summaryResponse.content;


  /**
   * Step 3 — Generate Keywords
   */

  const keywordPrompt = ChatPromptTemplate.fromTemplate(
    "Generate 3 SEO keywords for the blog titled: {title}"
  );

  const keywordChain = keywordPrompt.pipe(model);

  const keywordResponse = await keywordChain.invoke({
    title
  });

  const keywords = keywordResponse.content;

  return {
    topic,
    title,
    summary,
    keywords
  };

}