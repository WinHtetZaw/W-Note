// import { fail, ok } from "@/lib/result";
// import { getWorkspaceSubscription } from "../../billing/server/queries/get-workspace-subscription";
// import { countAIUsageThisMonth } from "@/features/ai/server/queries/count-ai-usage-month";
// import { ErrorReason } from "@/lib/errors";
// import { PLAN_LIMITS } from "@/features/billing/config/plan-limits";

// export async function checkAIUsageService(workspaceId: string) {
//   const subscription = await getWorkspaceSubscription(workspaceId);

//   const plan = subscription?.status === "active" ? subscription.plan : "free";

//   const limit = PLAN_LIMITS[plan].aiRequestsPerMonth;

//   const usage = await countAIUsageThisMonth(workspaceId);

//   const remaining = limit - usage;

//   if (usage >= limit) {
//     return fail({ reason: ErrorReason.AIUsageLimitReached });
//   }

//   return ok({ plan, limit, usage, remaining });
// }

// features/ai/services/check-ai-usage-service.ts

import { fail, ok } from "@/lib/result";
import { countAIUsageThisMonth } from "../server/queries/count-ai-usage-month";
import { checkPlanLimit } from "@/features/billing/services/check-plan-limit";

export async function checkAIUsageService(workspaceId: string) {
  const usage = await countAIUsageThisMonth(workspaceId);

  const [error, data] = await checkPlanLimit({
    workspaceId,
    resource: "aiRequestsPerMonth",
    usage,
  });

  if (error) {
    return fail({
      reason: error.reason,
      details: error.details,
    });
  }

  return ok({
    plan: data.plan,
    limit: data.limit,
    usage: data.usage,
    remaining: data.remaining,
    unlimited: data.unlimited,
  });
}
