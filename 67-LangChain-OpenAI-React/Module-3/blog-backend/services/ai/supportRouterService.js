import { ChatPromptTemplate } from "@langchain/core/prompts";
import { getChatModel } from "./openaiClient.js";

export async function routeSupportQuestion(question) {
  const model = getChatModel();

  /**
   * Step 1 — Intent Classification
   */

  const classifierPrompt = ChatPromptTemplate.fromTemplate(`
Classify the following customer support question into one category.

Categories:
billing
technical
product

Return ONLY the category name.

Question: {question}
`);

  const classifierChain = classifierPrompt.pipe(model);

  const classification = await classifierChain.invoke({
    question,
  });

  const intent = classification.content.trim().toLowerCase();

  /**
   * Step 2 — Conditional Routing
   */

  if (intent.includes("billing")) {
    return await billingChain(question);
  }

  if (intent.includes("technical")) {
    return await technicalChain(question);
  }

  return await productChain(question);
}

async function billingChain(question) {

  const model = getChatModel();

  const prompt = ChatPromptTemplate.fromTemplate(`
You are a billing support assistant.

Answer the following billing question clearly.

Question: {question}
`);

  const chain = prompt.pipe(model);

  const response = await chain.invoke({
    question
  });

  return {
    category: "billing",
    answer: response.content
  };

}

async function technicalChain(question) {

  const model = getChatModel();

  const prompt = ChatPromptTemplate.fromTemplate(`
You are a technical support assistant.

Help troubleshoot the issue.

Question: {question}
`);

  const chain = prompt.pipe(model);

  const response = await chain.invoke({
    question
  });

  return {
    category: "technical",
    answer: response.content
  };

}

async function productChain(question) {

  const model = getChatModel();

  const prompt = ChatPromptTemplate.fromTemplate(`
You are a product expert.

Explain the product clearly.

Question: {question}
`);

  const chain = prompt.pipe(model);

  const response = await chain.invoke({
    question
  });

  return {
    category: "product",
    answer: response.content
  };

}