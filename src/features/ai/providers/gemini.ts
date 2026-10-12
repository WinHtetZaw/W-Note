import { env } from "@/data/env/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

export async function generateWithGemini(prompt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
  });

  return {
    text: response.text ?? "",
  };
}
