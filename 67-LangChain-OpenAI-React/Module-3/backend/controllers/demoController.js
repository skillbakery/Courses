import { runChainDemo } from "../services/ai/chainService.js";
import { runToolDemo } from "../services/ai/toolService.js";
import { runAgentDemo } from "../services/ai/agentService.js";

export async function chainDemo(req, res) {
  try {
    const { question } = req.body;

    const answer = await runChainDemo(question);

    res.json({
      type: "chain",
      answer,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Chain demo failed",
    });
  }
}

export async function toolDemo(req, res) {
  try {
    const { question } = req.body;

    const answer = await runToolDemo(question);

    res.json({
      type: "tool",
      answer,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Tool demo failed",
    });
  }
}

export async function agentDemo(req, res) {
  try {
    const { question } = req.body;

    const answer = await runAgentDemo(question);

    res.json({
      type: "agent",
      answer,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Agent demo failed",
    });
  }
}
