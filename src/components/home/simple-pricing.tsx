import { SubscriptionPlans } from "@/features/billing/constants/billing.constants";
import { PLAN_DISPLAY } from "@/features/billing/constants/plan-display";
import { getPlanFeatures } from "@/features/billing/uitls/get-plan-features";

export default function SimplePricing() {
  const planNames = Object.keys(PLAN_DISPLAY) as SubscriptionPlans[];
  console.log("planf", getPlanFeatures("free"));
  console.log("plan", planNames);
  return <div>SimplePricing</div>;
}
