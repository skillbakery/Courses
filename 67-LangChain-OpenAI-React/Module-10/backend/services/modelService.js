import {
  getPrimaryModel,
  getFallbackModel,
} from "../services/openaiClient.js";

export async function invokeModel(messages) {

  try {

    const model =
      getPrimaryModel();

    return await model.invoke(messages);

  } catch (err) {

    console.log(
      "Switching to fallback model"
    );

    const fallback =
      getFallbackModel();

    return await fallback.invoke(messages);
  }
}