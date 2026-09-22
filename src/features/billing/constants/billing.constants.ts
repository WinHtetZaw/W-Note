export const SUBSCRIPTION_PLANS = ["free", "pro", "team"] as const;
export const SUBSCRIPTION_STATUS = ["active", "canceled", "past_due"] as const;

// export const subscriptionPlans = ["free", "pro", "team"] as const;
export type SubscriptionPlans = (typeof SUBSCRIPTION_PLANS)[number];

export const planResources = [
  "workspaces",
  "notes",
  "folders",
  "members",
  "aiRequestsPerMonth",
] as const;

export type PlanResource = (typeof planResources)[number];

export const planFeatures = [
  "noteHistory",
  "aiSearch",
  "advancedAI",
  "teamCollaboration",
  "advancedPermissions",
  "priorityProcessing",
  "prioritySupport",
] as const;

export type PlanFeature = (typeof planFeatures)[number];

export type PlanLimit = number | null;

export type PlanFeatures = Record<PlanFeature, boolean>;

export type PlanLimits = {
  workspaces: PlanLimit;
  notes: PlanLimit;
  folders: PlanLimit;
  members: PlanLimit;

  ai: {
    requestsPerMonth: PlanLimit;
  };

  features: PlanFeatures;
};
