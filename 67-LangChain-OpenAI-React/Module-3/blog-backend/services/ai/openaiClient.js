import { ChatOpenAI } from "@langchain/openai";

let chatModel;

export function getChatModel() {

  if (!chatModel) {

    chatModel = new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      modelName: "gpt-4o-mini",
      temperature: 0.7
    });

    console.log("Chat model initialized");

  }

  return chatModel;

}