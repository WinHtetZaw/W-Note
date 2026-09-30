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
import { ErrorReason } from "@/lib/errors";

export async function checkAIUsageService(workspaceId: string) {
  const currentCount = await countAIUsageThisMonth(workspaceId);

  const result = await checkPlanLimit({
    workspaceId,
    resource: "aiRequestsPerMonth",
    currentCount,
  });

  if (!result.allowed) {
    return fail({
      reason: ErrorReason.AIUsageLimitReached,
    });
  }

  return ok({
    plan: result.plan,
    limit: result.limit,
    current: result.current,
    remaining: result.remaining,
    // unlimited: result.unlimited,
  });
}
