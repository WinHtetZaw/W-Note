import { SubscriptionPlans } from "@/features/billing/constants/billing.constants";
import { PLAN_DISPLAY } from "@/features/billing/constants/plan-display";
import { getPlanFeatures } from "@/features/billing/uitls/get-plan-features";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Link from "next/link";

type Props = {
  planName: SubscriptionPlans;
};

export default function PricingCard(props: Props) {
  const { planName } = props;
  const features = getPlanFeatures(planName);
  const plan = PLAN_DISPLAY[planName];

  return (
    <div
      className={`relative rounded-[32px] border p-10 backdrop-blur-2xl ${
        plan.popular
          ? "border-violet-500 bg-violet-500/10"
          : "border-white/10 bg-white/5"
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold">
          Most Popular
        </div>
      )}

      <h2 className="text-3xl font-bold">{plan.name}</h2>

      <div className="mt-6 flex items-end gap-2">
        <span className="text-6xl font-black">{plan.price}</span>

        <span className="pb-2 text-zinc-400">/month</span>
      </div>

      <p className="mt-5 leading-7 text-zinc-400">{plan.description}</p>

      <Link
        href="/dashboard"
        className={`mt-10 flex w-full items-center justify-center rounded-2xl px-6 py-4 text-lg font-semibold transition ${
          plan.popular
            ? "bg-violet-600 hover:bg-violet-500"
            : "bg-white/10 hover:bg-white/20"
        }`}
      >
        {planName == "free" && "Get Started"}
        {planName == "pro" && "Upgrade to Pro"}
        {planName == "team" && "Contact Sales"}
      </Link>

      <div className="my-10 h-px bg-white/10" />

      <ul className="space-y-5">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3">
            <Check className="h-5 w-5 text-violet-400" />

            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
