export const toolDefinitions = [
  {
    name: "getWeather",
    description: "Get current weather of a city",
    parameters: {
      type: "object",
      properties: {
        city: { type: "string" },
      },
      required: ["city"],
    },
  },
  {
    name: "calculate",
    description: "Evaluate a math expression",
    parameters: {
      type: "object",
      properties: {
        expression: { type: "string" },
      },
      required: ["expression"],
    },
  },
];