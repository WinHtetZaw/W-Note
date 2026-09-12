import { ErrorReason } from "@/lib/errors";
import { requireWorkspaceMember } from "@/lib/permissions";
import { fail, ok } from "@/lib/result";
import z from "zod";
import { getActiveSubscriptionPlan } from "../server/queries/get-active-subscription-plan";

const schema = z.object({
  workspaceId: z.uuid(),
});

type IncomingData = z.infer<typeof schema>;

export async function fetchActiveSubscriptionPlanService(
  rawData: IncomingData,
) {
  //========== Validating incoming data ==========//
  const result = schema.safeParse(rawData);
  if (!result.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: result.error });
  }
  const workspaceId = result.data.workspaceId;

  //========== Auth ==========//
  const [authError] = await requireWorkspaceMember(workspaceId);
  if (authError) {
    return fail({ reason: authError.reason });
  }

  //========== DB Fetching ==========//
  try {
    const activePlan = await getActiveSubscriptionPlan(workspaceId);
    if (!activePlan) {
      return fail({ reason: ErrorReason.SubscriptionNotFound });
    }
    return ok(activePlan);
  } catch (error) {
    return fail({ reason: ErrorReason.UnexpectedError, details: error });
  }
}
