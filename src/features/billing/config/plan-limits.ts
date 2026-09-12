import { PlanLimits } from "../types/billing.types";

export const PLAN_LIMITS: PlanLimits = {
  free: {
    aiRequestsPerMonth: 20,
  },

  pro: {
    aiRequestsPerMonth: 500,
  },

  team: {
    aiRequestsPerMonth: 2000,
  },
} as const;
