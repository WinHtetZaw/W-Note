import { PLAN_LIMITS } from "../config/plan-limits";
import { getWorkspacePlanService } from "./get-workspace-plan-service";

export async function getWorkspaceEntitlements(workspaceId: string) {
  const subscription = await getWorkspacePlanService(workspaceId);

  const plan = subscription.status === "active" ? subscription.plan : "free";

  return {
    plan,

    status: subscription.status,

    limits: PLAN_LIMITS[plan],

    cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,

    currentPeriodEnd: subscription.currentPeriodEnd,
  };
}
