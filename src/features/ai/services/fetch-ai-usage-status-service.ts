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
  // const validated = schema.safeParse(rawData);
  // if (validated.error) {
  //   return fail({ reason: ErrorReason.InvalidInput, details: validated.error });
  // }
  // const workspaceId = validated.data.workspaceId;
  // //========== Auth and permisssion ==========//
  // const [authError] = await requireWorkspaceMember(workspaceId);
  // if (authError) {
  //   return fail({ reason: authError.reason });
  // }
  // //========== DB fetching ==========//
  // try {
  //   const currentCount = await countAIUsageThisMonth(workspaceId);
  //   const result = await checkPlanLimit({
  //     workspaceId,
  //     resource: "aiRequestsPerMonth",
  //     currentCount,
  //   });
  //   if (!result.allowed) {
  //     return fail({
  //       reason: ErrorReason.AIUsageLimitReached,
  //     });
  //   }
  //   return ok({
  //     usage: result.current,
  //     limit: result.limit,
  //     remaining: result.remaining,
  //   });
  // } catch {
  //   return fail({ reason: ErrorReason.UnexpectedError });
  // }
}
