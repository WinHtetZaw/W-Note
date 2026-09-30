import { PLAN_LIMITS } from "../config/plan-limits";
import { getWorkspacePlanService } from "./get-workspace-plan-service";

export async function getWorkspaceEntitlements(workspaceId: string) {
  const subscription = await getWorkspacePlanService(workspaceId);

  const hasPaidAccess = subscription.status === "active";

  const effectivePlan = hasPaidAccess ? subscription.plan : "free";

  return {
    plan: effectivePlan,

    subscriptionPlan: subscription.plan,

    status: subscription.status,

    limits: PLAN_LIMITS[effectivePlan],

    cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,

    currentPeriodEnd: subscription.currentPeriodEnd,
  };
}
