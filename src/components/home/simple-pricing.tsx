import { SubscriptionPlans } from "@/features/billing/constants/billing.constants";
import { PLAN_DISPLAY } from "@/features/billing/constants/plan-display";
import { Button } from "../ui/button";
import Link from "next/link";
import BillingPlanCard from "../ui/billing-plan-card";

export default function SimplePricing() {
  const planNames = Object.keys(PLAN_DISPLAY) as SubscriptionPlans[];
  const landingPagePlan = planNames.filter((p) => p != "team");

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {landingPagePlan.map((p) => {
        const plan = PLAN_DISPLAY[p];

        return (
          <BillingPlanCard planName={p} key={p}>
            <Button
              variant={plan.popular ? "default" : "outline"}
              className="w-full mt-auto"
              asChild
            >
              <Link href="/dashboard">
                {plan.popular ? "Activate Now" : "Get Started"}
              </Link>
            </Button>
          </BillingPlanCard>
        );
      })}
    </div>
  );
}
