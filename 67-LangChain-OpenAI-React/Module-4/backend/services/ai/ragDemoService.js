import { ChatPromptTemplate } from "@langchain/core/prompts";
import { getChatModel } from "./openaiClient.js";
import { retrieveDocs } from "./retrievalService.js";
export async function askWithRagService(question) {
  const model = getChatModel();

  /**
   * Step 1: Retrieve context
   */
  const contextDocs = retrieveDocs(question);
  console.log(contextDocs);

  const context = contextDocs.join("\n");

  /**
   * Step 2: Prompt with context
   */
  const prompt = ChatPromptTemplate.fromTemplate(`
    You are a support assistant.

    Use ONLY the following context to answer.

    Context:
    {context}

    Question:
    {question}
    `);

  const chain = prompt.pipe(model);

  const response = await chain.invoke({
    context,
    question,
  });

  return {
    answer: response.content,
    contextUsed: contextDocs,
  };
}
