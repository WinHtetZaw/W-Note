import { SubscriptionPlans } from "@/features/billing/constants/billing.constants";
import { PLAN_DISPLAY } from "@/features/billing/constants/plan-display";
import { getPlanFeatures } from "@/features/billing/uitls/get-plan-features";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  planName: SubscriptionPlans;
  children: ReactNode;
};

export default function BillingPlanCard(props: Props) {
  const { planName, children } = props;
  const features = getPlanFeatures(planName);
  const plan = PLAN_DISPLAY[planName];

  //   return (
  //     <div
  //       key={plan.name}
  //       className={[
  //         "relative flex flex-col overflow-hidden rounded-2xl border p-6 backdrop-blur-xl",
  //         plan.popular
  //           ? "border-violet-500/40 bg-violet-500/6"
  //           : "border-white/10 bg-white/3",
  //       ].join(" ")}
  //     >
  //       {plan.popular && (
  //         <div className="absolute right-5 top-5 rounded-full bg-violet-500/15 px-2.5 py-1 text-[11px] font-semibold text-violet-300">
  //           Most popular
  //         </div>
  //       )}

  //       <div className="flex size-11 items-center justify-center rounded-xl bg-white/5">
  //         <Icon className="size-5 text-violet-400" />
  //       </div>

  //       <h3 className="mt-5 text-lg font-semibold text-white">{plan.name}</h3>

  //       <p className="mt-2 min-h-12 text-sm leading-5 text-zinc-500">
  //         {plan.description}
  //       </p>

  //       <div className="mt-6">
  //         <span className="text-3xl font-bold text-white">{plan.price}</span>

  //         <span className="ml-1 text-sm text-zinc-500">/ {plan.period}</span>
  //       </div>

  //       <ul className="my-6 flex-1 space-y-3">
  //         {features.map((feature, i) => (
  //           <li
  //             key={`${feature}${i}`}
  //             className="flex items-start gap-2.5 text-sm text-zinc-400"
  //           >
  //             <Check className="mt-0.5 size-4 shrink-0 text-violet-400" />
  //             <span>{feature}</span>
  //           </li>
  //         ))}
  //       </ul>

  //       {children}
  //     </div>
  //   );

  return (
    <div
      className={cn(
        "rounded-[32px] border p-10 backdrop-blur-xl bg-white/5 flex flex-col",
        plan.popular && " border border-violet-500 bg-violet-500/10",
      )}
      key={plan.name}
    >
      <h3 className="text-3xl font-bold">{plan.name}</h3>

      <div className="mt-5 flex items-end gap-2">
        <span className="text-5xl font-black">${plan.price}</span>
        <span className="pb-1 text-muted">/month</span>
      </div>

      <p className="mt-5 text-muted">{plan.description}</p>

      <ul className="mt-8 mb-10 space-y-4">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3">
            <Check className="size-5 text-primary" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
}
