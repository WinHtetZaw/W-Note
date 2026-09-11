import { fail, ok } from "@/lib/result";
import { generateWithGroq } from "../providers/groq";
import { ErrorReason } from "@/lib/errors";
import { AIRequestType } from "../types/ai.types";
import { AI_REQUEST_CONFIG } from "../config/ai-request-config";

type GenerateTextInput = {
  // prompt: {
  //   systemPrompt: string;
  //   userPrompt: string;
  // };
  // maxOutputTokens?: number;
  requestType: AIRequestType;
  variables: Record<string, string>;
};

export async function generateTextService(input: GenerateTextInput) {
  const config = AI_REQUEST_CONFIG[input.requestType];

  try {
    const res = await generateWithGroq({
      systemPrompt: config.systemPrompt,
      userPrompt: config.buildUserPrompt(input.variables),
    });

    return ok(res);
  } catch (err) {
    console.error("AI generation failed:", err);

    return fail({
      reason: ErrorReason.AIGenerationFailed,
    });
  }
}
