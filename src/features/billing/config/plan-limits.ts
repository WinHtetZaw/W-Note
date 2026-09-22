// features/billing/config/plan-limits.ts

import { PlanLimits, SubscriptionPlans } from "../constants/billing.constants";

// import {
//   SubscriptionPlans,
//   PlanLimits,
// } from "../types/billing.types";

export const PLAN_LIMITS = {
  free: {
    workspaces: 1,
    // notes: 50,
    notes: 3,
    folders: 5,
    members: 1,

    ai: {
      // requestsPerMonth: 20,
      requestsPerMonth: 6,
    },

    features: {
      noteHistory: false,
      aiSearch: false,
      advancedAI: false,
      teamCollaboration: false,
      advancedPermissions: false,
      priorityProcessing: false,
      prioritySupport: false,
    },
  },

  pro: {
    workspaces: 3,
    notes: null,
    folders: null,
    members: 3,

    ai: {
      requestsPerMonth: 500,
    },

    features: {
      noteHistory: true,
      aiSearch: true,
      advancedAI: true,
      teamCollaboration: false,
      advancedPermissions: false,
      priorityProcessing: true,
      prioritySupport: false,
    },
  },

  team: {
    workspaces: 10,
    notes: null,
    folders: null,
    members: 10,

    ai: {
      requestsPerMonth: 2_000,
    },

    features: {
      noteHistory: true,
      aiSearch: true,
      advancedAI: true,
      teamCollaboration: true,
      advancedPermissions: true,
      priorityProcessing: true,
      prioritySupport: true,
    },
  },
} satisfies Record<SubscriptionPlans, PlanLimits>;

export type PlanLimitErrorDetails = {
  resource:
    "workspaces" | "notes" | "folders" | "members" | "aiRequestsPerMonth";

  plan: SubscriptionPlans;
  usage: number;
  limit: number;
  remaining: 0;
};
