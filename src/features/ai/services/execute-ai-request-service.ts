import { ErrorReason } from "@/lib/errors";
import { fail, ok } from "@/lib/result";
import { getWorkspaceEntitlements } from "@/features/billing/services/get-workspace-entitlements";
import { reserveAiRequest } from "@/features/ai/server/mutations/reserve-ai-request";
import { completeAiRequest } from "@/features/ai/server/mutations/complete-ai-request";
import { generateTextService } from "@/features/ai/services/generate-text-service";
import {
  AIModels,
  AIProvider,
  AIRequestInput,
  AIRequestType,
} from "../types/ai.types";
import { releaseAiRequest } from "../server/mutations/release-ai-quest";

type ExecuteAiRequestInput<K extends AIRequestType> = {
  workspaceId: string;
  userId: string;
  requestType: K;
  variables: AIRequestInput[K];
  provider?: AIProvider;
  model?: AIModels[AIProvider][number];
  costInCents?: number;
};

export async function executeAiRequestService<K extends AIRequestType>({
  workspaceId,
  userId,
  requestType,
  variables,
}: ExecuteAiRequestInput<K>) {
  // 1. Get workspace AI limit
  const entitlements = await getWorkspaceEntitlements(workspaceId);
  const aiLimit = entitlements.limits.ai.requestsPerMonth;

  // 2. Reserve one AI request atomically
  const reservation = await reserveAiRequest(workspaceId, aiLimit);

  if (!reservation.allowed) {
    return fail({
      reason: ErrorReason.AIUsageLimitReached,
    });
  }

  // 3. Call AI provider
  const [aiError, generatedData] = await generateTextService({
    requestType,
    variables,
  });

  // 4. Release reservation if provider failed
  if (aiError) {
    await releaseAiRequest(reservation.reservationId);

    return fail({
      reason: aiError.reason,
    });
  }

  const { requestType: generatedRequestType, usage, text } = generatedData;

  const inputTokens = usage?.prompt_tokens ?? 0;
  const outputTokens = usage?.completion_tokens ?? 0;

  // 5. Complete reservation + record usage
  try {
    const completed = await completeAiRequest({
      reservationId: reservation.reservationId,
      workspaceId,
      userId,
      requestType: generatedRequestType,
      provider: "groq",
      model: "openai/gpt-oss-20b",
      inputTokens,
      outputTokens,
      costInCents: 0,
    });

    if (!completed.completed) {
      return fail({
        reason: ErrorReason.UnexpectedError,
      });
    }
  } catch {
    // Do NOT release here.
    // Provider already succeeded.
    return fail({
      reason: ErrorReason.UnexpectedError,
    });
  }

  return ok({
    text,
    usage,
    requestType: generatedRequestType,
  });
}
