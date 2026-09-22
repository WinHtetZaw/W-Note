// features/billing/services/get-workspace-entitlements.ts

import { PLAN_LIMITS } from "../config/plan-limits";
import { SubscriptionPlans } from "../constants/billing.constants";
import { getWorkspaceSubscription } from "../server/queries/get-workspace-subscription";

export async function getWorkspaceEntitlements(workspaceId: string) {
  const subscription = await getWorkspaceSubscription(workspaceId);

  const plan: SubscriptionPlans =
    subscription?.status === "active" ? subscription.plan : "free";

  const limits = PLAN_LIMITS[plan];

  return {
    plan,
    limits,
    features: limits.features,
  };
}
