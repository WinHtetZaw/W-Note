import { SubscriptionPlans } from "@/features/billing/constants/billing.constants";
import { PLAN_DISPLAY } from "@/features/billing/constants/plan-display";
import PricingCard from "./pricing-card";

export default function PricingCardList() {
  const plans = Object.keys(PLAN_DISPLAY) as SubscriptionPlans[];

  return (
    <section className="mx-auto max-w-7xl section-padding-block">
      <div className="grid gap-8 lg:grid-cols-3">
        {plans.map((plan) => (
          <PricingCard key={plan} planName={plan} />
        ))}
      </div>
    </section>
  );
}
