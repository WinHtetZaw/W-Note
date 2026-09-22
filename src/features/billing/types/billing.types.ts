import {
  SUBSCRIPTION_PLANS,
  SUBSCRIPTION_STATUS,
} from "../constants/billing.constants";

export type SubscriptionPlans = (typeof SUBSCRIPTION_PLANS)[number];

export type SubscriptionStatus = (typeof SUBSCRIPTION_STATUS)[number];

// export type PlanLimits = Record<SubscriptionPlans, Record<string, number>>;
export type PlanLimits = Record<SubscriptionPlans, unknown>;
