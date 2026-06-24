import { DynamicTool } from "@langchain/core/tools";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { createChatModel } from "./openaiClient.js";


const calculatorTool = new DynamicTool({

  name: "calculator",

  description: "Useful for math calculations",

  func: async (input) => {

    try {

      return eval(input).toString();

    } catch {

      return "Invalid math expression";

    }

  }

});


export async function runAgentDemo(question) {

  const model = createChatModel();

  const executor = await initializeAgentExecutorWithOptions(

    [calculatorTool],
    model,

    {
      agentType: "openai-functions",
      verbose: true
    }

  );

  const result = await executor.invoke({
    input: question
  });

  return result.output;

}