import { PLAN_LIMITS } from "../config/plan-limits";
import { SubscriptionPlans } from "../constants/billing.constants";

export function getPlanFeatures(plan: SubscriptionPlans) {
  const limits = PLAN_LIMITS[plan];

  return [
    limits.notes === null ? "Unlimited notes" : `Up to ${limits.notes} notes`,

    limits.folders === null
      ? "Unlimited folders"
      : `Up to ${limits.folders} folders`,

    limits.workspaces === null
      ? "Unlimited workspaces"
      : `${limits.workspaces} workspace${limits.workspaces === 1 ? "" : "s"}`,

    limits.members === null
      ? "Unlimited members"
      : `${limits.members} member${limits.members === 1 ? "" : "s"}`,

    limits.ai.requestsPerMonth === null
      ? "Unlimited AI requests"
      : `${limits.ai.requestsPerMonth} AI requests per month`,

    limits.features.noteHistory && "Note history",
    limits.features.aiSearch && "AI-powered search",
    limits.features.advancedAI && "Advanced AI assistance",
    limits.features.teamCollaboration && "Team collaboration",
    limits.features.advancedPermissions && "Advanced permissions",
    limits.features.priorityProcessing && "Priority processing",
    limits.features.prioritySupport && "Priority support",
  ].filter(Boolean);
}
