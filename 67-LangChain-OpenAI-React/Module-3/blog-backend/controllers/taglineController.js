import { generateTaglineRaw as generateTaglineRawService } 
from "../services/ai/taglineRawService.js";

import { generateTaglineLangChain } 
from "../services/ai/taglineLangChainService.js";


export async function generateTaglineRaw(req, res) {

  const { product } = req.body;

  const tagline = await generateTaglineRawService(product);

  res.json({ tagline });

}


export async function generateTaglineLC(req, res) {

  const { product } = req.body;

  const tagline = await generateTaglineLangChain(product);

  res.json({ tagline });

}