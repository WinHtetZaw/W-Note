import { getWorkspaceEntitlements } from "./get-workspace-entitlements";
import { PlanLimit, PlanResource } from "../constants/billing.constants";

type CheckPlanLimitInput = {
  workspaceId: string;
  resource: PlanResource;
  currentCount: number;
};

function getLimit(
  limits: Awaited<ReturnType<typeof getWorkspaceEntitlements>>["limits"],
  resource: PlanResource,
): PlanLimit {
  switch (resource) {
    case "workspaces":
      return limits.workspaces;

    case "notes":
      return limits.notes;

    case "folders":
      return limits.folders;

    case "members":
      return limits.members;

    case "aiRequestsPerMonth":
      return limits.ai.requestsPerMonth;

    default: {
      const exhaustiveCheck: never = resource;
      throw new Error(`Unknown plan resource: ${String(exhaustiveCheck)}`);
    }
  }
}

export async function checkPlanLimit({
  workspaceId,
  resource,
  currentCount,
}: CheckPlanLimitInput) {
  const entitlements = await getWorkspaceEntitlements(workspaceId);

  const limit = getLimit(entitlements.limits, resource);

  // null means unlimited
  if (limit === null) {
    return {
      allowed: true,
      limit: null,
      current: currentCount,
    };
  }

  const remaining = Math.max(limit - currentCount, 0);
  return {
    plan: entitlements.plan,
    allowed: currentCount < limit,
    limit,
    remaining,
    current: currentCount,
  };
}
