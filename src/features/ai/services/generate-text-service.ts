import { fail, ok } from "@/lib/result";
import { generateWithGroq } from "../providers/groq";
import { ErrorReason } from "@/lib/errors";
import { AIRequestInput, AIRequestType } from "../types/ai.types";
import { AI_REQUEST_CONFIG } from "../config/ai-request-config";

type GenerateTextInput<K extends AIRequestType> = {
  requestType: K;
  variables: AIRequestInput[K];
};

export async function generateTextService<K extends AIRequestType>(
  input: GenerateTextInput<K>,
) {
  const config = AI_REQUEST_CONFIG[input.requestType];

  try {
    const res = await generateWithGroq({
      systemPrompt: config.systemPrompt,
      userPrompt: config.buildUserPrompt(input.variables),
    });

    return ok({ ...res, requestType: input.requestType });
  } catch (err) {
    console.error("AI generation failed:", err);

    return fail({
      reason: ErrorReason.AIGenerationFailed,
    });
  }
}
