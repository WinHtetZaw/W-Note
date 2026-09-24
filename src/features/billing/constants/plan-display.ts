import { Sparkles, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SubscriptionPlans } from "./billing.constants";

export type PlanDisplayDetail = {
  name: string;
  description: string;
  price: number;
  period: string;
  icon: LucideIcon;
  popular: boolean;
};

export const PLAN_DISPLAY = {
  free: {
    name: "Free",
    description: "For individuals getting started with AI notes.",
    price: 0,
    period: "forever",
    icon: Sparkles,
    popular: false,
  },

  pro: {
    name: "Pro",
    description: "For individuals and small teams using AI every day.",
    price: 12,
    period: "per month",
    icon: Sparkles,
    popular: true,
  },

  team: {
    name: "Team",
    description: "For teams collaborating on a shared knowledge base.",
    price: 24,
    period: "per member / month",
    icon: Users,
    popular: false,
  },
} satisfies Record<SubscriptionPlans, PlanDisplayDetail>;
