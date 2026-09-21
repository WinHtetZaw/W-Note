"use client";

import { wait } from "@/lib/utils";
import { Check, Sparkles, Users } from "lucide-react";
import { useTransition } from "react";
import { SubscriptionPlans } from "../types/billing.types";
import { createCheckoutSession } from "../server/actions/create-checkout-session";

type BillingPlansProps = {
  workspaceId: string;
  activePlan: SubscriptionPlans;
};

const plans = [
  {
    name: "free",
    description: "For individuals getting started with AI notes.",
    price: "$0",
    period: "forever",
    icon: Sparkles,
    features: [
      "Up to 50 notes",
      "Basic AI assistance",
      "1 workspace",
      "Basic note search",
    ],
  },
  {
    name: "pro",
    description: "For individuals and small teams using AI every day.",
    price: "$12",
    period: "per month",
    icon: Sparkles,
    popular: true,
    features: [
      "Unlimited notes",
      "Advanced AI assistance",
      "Unlimited folders",
      "AI-powered search",
      "Note history",
      "Priority processing",
    ],
  },
  {
    name: "team",
    description: "For teams collaborating on a shared knowledge base.",
    price: "$24",
    period: "per member / month",
    icon: Users,
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Workspace members",
      "Advanced permissions",
      "Team AI usage",
      "Priority support",
    ],
  },
];

export default function BillingPlans({
  workspaceId,
  activePlan,
}: BillingPlansProps) {
  const [isPending, startTransition] = useTransition();

  const handleClcik = (planName: string) => {
    startTransition(async () => {
      await wait(2000);
      console.log(planName);

      const res = await createCheckoutSession({
        workspaceId,
        plan: "pro",
      });

      if (res.code) {
        console.log(res);
        return;
      }
      console.log(res);

      if (res.data.url) window.location.href = res.data?.url;
    });
  };

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {plans.map((plan) => {
        const Icon = plan.icon;

        return (
          <div
            key={plan.name}
            className={[
              "relative flex flex-col overflow-hidden rounded-2xl border p-6 backdrop-blur-xl",
              plan.popular
                ? "border-violet-500/40 bg-violet-500/[0.06]"
                : "border-white/10 bg-white/[0.03]",
            ].join(" ")}
          >
            {plan.popular && (
              <div className="absolute right-5 top-5 rounded-full bg-violet-500/15 px-2.5 py-1 text-[11px] font-semibold text-violet-300">
                Most popular
              </div>
            )}

            <div className="flex size-11 items-center justify-center rounded-xl bg-white/5">
              <Icon className="size-5 text-violet-400" />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-white">
              {plan.name}
            </h3>

            <p className="mt-2 min-h-12 text-sm leading-5 text-zinc-500">
              {plan.description}
            </p>

            <div className="mt-6">
              <span className="text-3xl font-bold text-white">
                {plan.price}
              </span>

              <span className="ml-1 text-sm text-zinc-500">
                / {plan.period}
              </span>
            </div>

            <ul className="mt-6 flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-sm text-zinc-400"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-violet-400" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => handleClcik(plan.name)}
              className={[
                "mt-8 h-10 rounded-xl px-4 text-sm font-semibold transition",
                plan.popular
                  ? "bg-violet-500 text-white hover:bg-violet-400"
                  : "border border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10",
              ].join(" ")}
            >
              {plan.name === activePlan
                ? "Current plan (active)"
                : `Choose ${plan.name}`}
            </button>
          </div>
        );
      })}
    </div>
  );
}
