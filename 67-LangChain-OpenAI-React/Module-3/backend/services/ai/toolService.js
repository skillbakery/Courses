import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createChatModel } from "./openaiClient.js";

function calculator(expression) {

  try {

    return eval(expression);

  } catch {

    return "Invalid math expression";

  }

}

export async function runToolDemo(question) {

  const model = createChatModel();

  if (/[0-9]+\s*[\+\-\*\/]\s*[0-9]+/.test(question)) {

    const result = calculator(question);

    return `Tool Result: ${result}`;

  }

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a helpful assistant."],
    ["human", "{question}"]
  ]);

  const chain = prompt.pipe(model);

  const response = await chain.invoke({
    question
  });

  return response.content;

}