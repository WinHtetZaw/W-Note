import { env } from "@/data/env/server";
import { SubscriptionPlans } from "@/features/billing/types/billing.types";

export const stripePrices = {
  pro: env.STRIPE_PRO_PRICE_ID,
  team: env.STRIPE_TEAM_PRICE_ID,
} satisfies Record<Exclude<SubscriptionPlans, "free">, string>;
