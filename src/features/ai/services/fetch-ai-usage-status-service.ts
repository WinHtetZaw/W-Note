import { ErrorReason } from "@/lib/errors";
import { requireWorkspaceMember } from "@/lib/permissions";
import { fail, ok } from "@/lib/result";
import z from "zod";
import { countAIUsageThisMonth } from "../server/queries/count-ai-usage-month";
import { checkPlanLimit } from "@/features/billing/services/check-plan-limit";

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
    const usage = await countAIUsageThisMonth(workspaceId);
    const [error, data] = await checkPlanLimit({
      workspaceId,
      resource: "aiRequestsPerMonth",
      usage,
    });

    if (error) {
      return fail({
        reason: error.reason,
        details: error.details,
      });
    }
    return ok({
      usage: data.usage,
      limit: data.limit,
      remaining: data.remaining,
    });
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
