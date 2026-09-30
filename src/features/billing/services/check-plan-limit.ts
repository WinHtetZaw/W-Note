import { PlanResource } from "../constants/billing.constants";
import { getWorkspaceEntitlements } from "./get-workspace-entitlements";

export async function checkPlanLimit(
  workspaceId: string,
  resource: PlanResource,
  currentCount: number,
) {
  const entitlements = await getWorkspaceEntitlements(workspaceId);

  const limit = entitlements.limits[resource];

  // null means unlimited
  if (limit === null) {
    return {
      allowed: true,
      current: currentCount,
      limit: null,
      plan: entitlements.plan,
      resource,
    };
  }

  return {
    allowed: currentCount < limit,
    current: currentCount,
    limit,
    plan: entitlements.plan,
    resource,
  };
}
