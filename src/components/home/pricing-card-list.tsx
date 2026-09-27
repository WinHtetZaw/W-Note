import { SubscriptionPlans } from "@/features/billing/constants/billing.constants";
import { PLAN_DISPLAY } from "@/features/billing/constants/plan-display";
import React from "react";
import PricingCard from "./pricing-card";

export default function PricingCardList() {
  const plans = Object.keys(PLAN_DISPLAY) as SubscriptionPlans[];

  return (
    <section className="mx-auto max-w-7xl px-6 pb-28">
      <div className="grid gap-8 lg:grid-cols-3">
        {plans.map((plan) => (
          <PricingCard key={plan} planName={plan} />
        ))}
      </div>
    </section>
  );
}
