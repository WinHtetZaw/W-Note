import { env } from "@/data/env/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: env.GROQ_API_KEY,
});

type Prompt = {
  systemPrompt: string;
  userPrompt: string;
};

export async function generateWithGroq(prompt: Prompt) {
  const { systemPrompt, userPrompt } = prompt;

  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",

    messages: [
      {
        role: "system",
        content: systemPrompt,
      },

      {
        role: "user",
        content: userPrompt,
      },
    ],
  });

  return {
    text: response.choices[0]?.message?.content ?? "",
    usage: response.usage,
  };
}

export async function streamWithGroq(prompt: string) {
  return groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    stream: true,
  });
}
