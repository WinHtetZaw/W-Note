// features/billing/services/check-plan-limit.ts

import { ErrorReason } from "@/lib/errors";
import { fail, ok } from "@/lib/result";

import { getWorkspaceEntitlements } from "./get-workspace-entitlements";
import { PlanLimit, PlanResource } from "../constants/billing.constants";

type CheckPlanLimitInput = {
  workspaceId: string;
  resource: PlanResource;
  usage: number;
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
      throw new Error(`Unhandled plan resource: ${String(exhaustiveCheck)}`);
    }
  }
}

export async function checkPlanLimit({
  workspaceId,
  resource,
  usage,
}: CheckPlanLimitInput) {
  const entitlements = await getWorkspaceEntitlements(workspaceId);

  const limit = getLimit(entitlements.limits, resource);

  // null means unlimited
  if (limit === null) {
    return ok({
      plan: entitlements.plan,
      resource,
      usage,
      limit: null,
      remaining: null,
      unlimited: true,
    });
  }

  const remaining = Math.max(limit - usage, 0);

  if (usage >= limit) {
    return fail({
      //   reason:
      //     resource === "aiRequestsPerMonth"
      //       ? ErrorReason.AIUsageLimitReached
      //       : ErrorReason.PlanLimitReached,
      reason: ErrorReason.PlanLimitReached,

      details: {
        resource,
        plan: entitlements.plan,
        usage,
        limit,
        remaining: 0,
      },
    });
  }

  return ok({
    plan: entitlements.plan,
    resource,
    usage,
    limit,
    remaining,
    unlimited: false,
  });
}
