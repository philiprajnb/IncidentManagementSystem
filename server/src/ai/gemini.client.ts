import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey: apiKey ?? "",
});

export default ai;
