import { getWorkspaceSubscription } from "../server/queries/get-workspace-subscription";
import { PLAN_LIMITS } from "../config/plan-limits";
import type {
  SubscriptionPlans,
  SubscriptionStatus,
} from "../types/billing.types";

export async function getWorkspacePlanService(workspaceId: string) {
  const subscription = await getWorkspaceSubscription(workspaceId);

  const plan: SubscriptionPlans = subscription?.plan ?? "free";

  const status: SubscriptionStatus = subscription?.status ?? "active";

  const limits = PLAN_LIMITS[plan];

  return {
    plan,
    status,

    limits,

    stripeCustomerId: subscription?.stripeCustomerId ?? null,

    stripeSubscriptionId: subscription?.stripeSubscriptionId ?? null,

    currentPeriodEnd: subscription?.currentPeriodEnd ?? null,

    cancelAtPeriodEnd: subscription?.cancelAtPeriodEnd ?? false,
  };
}
