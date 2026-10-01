import { getWorkspaceEntitlements } from "@/features/billing/services/get-workspace-entitlements";
import { getAIUsageCounter } from "../server/queries/get-ai-usage-counter";

export async function checkAIUsageService(workspaceId: string) {
  const entitlements = await getWorkspaceEntitlements(workspaceId);
  const limit = entitlements.limits.ai.requestsPerMonth;
  const counter = await getAIUsageCounter(workspaceId);
  const requestCount = counter.requestCount;

  return {
    allowed: requestCount < limit,
    requestCount,
    limit,
    remaining: Math.max(limit - requestCount, 0),
    plan: entitlements.plan,
    status: entitlements.status,
    cancelAtPeriodEnd: entitlements.cancelAtPeriodEnd,
    currentPeriodEnd: entitlements.currentPeriodEnd,
  };
}
