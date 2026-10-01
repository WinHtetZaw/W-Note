import { ErrorReason } from "@/lib/errors";
import { requireWorkspaceMember } from "@/lib/permissions";
import { fail, ok } from "@/lib/result";
import z from "zod";
import { countAIUsageThisMonth } from "../server/queries/count-ai-usage-month";
import { checkAIUsageService } from "./check-ai-usage-service";

const schema = z.object({ workspaceId: z.uuid() });
type IncomingData = z.infer<typeof schema>;

export async function fetchAIUsageStatusService(rawData: IncomingData) {
  //========= Valadation incoming data ========//
  const validated = schema.safeParse(rawData);
  if (validated.error) {
    return fail({ reason: ErrorReason.InvalidInput, details: validated.error });
  }
  const workspaceId = validated.data.workspaceId;
  //========== Auth and permisssion ==========//
  const [authError] = await requireWorkspaceMember(workspaceId);
  if (authError) {
    return fail({ reason: authError.reason });
  }
  //========== DB fetching ==========//
  try {
    const aiUsageStatus = await checkAIUsageService(workspaceId);

    // if (!quota.allowed) {
    //   return fail({
    //     reason: ErrorReason.AIUsageLimitReached,
    //   });
    // }
    return ok(aiUsageStatus);

    // return ok({
    //   usage: quota.requestCount,
    //   limit: quota.limit,
    //   remaining: quota.remaining,
    //   allowed: quota.allowed,
    // });
  } catch {
    return fail({
      reason: ErrorReason.UnexpectedError,
    });
  }
}
