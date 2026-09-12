import { CreditCard, Receipt, Sparkles } from "lucide-react";
import CurrentPlanCard from "./current-plan-card";
import BillingPlans from "./billing-plans";
import UsageOverview from "./usage-overview";
import BillingHistory from "./billing-history";
import { fetchActiveSubscriptionPlan } from "../server/actions/fetch-active-subscripton-plan";

type BillingPageProps = {
  workspaceId: string;
};

export default async function BillingPageContent({
  workspaceId,
}: BillingPageProps) {
  const activePlanData = await fetchActiveSubscriptionPlan(workspaceId);
  if (activePlanData.code) {
    return <p>unable to fetch activePlanData</p>;
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 px-6 py-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-300">
          <Sparkles className="size-3.5" />
          Workspace billing
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Billing & Plans
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
            Manage your workspace subscription, AI usage, and billing
            information.
          </p>
        </div>
      </div>

      {/* Current plan */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <CreditCard className="size-4 text-violet-400" />

          <h2 className="font-semibold text-white">Current plan</h2>
        </div>

        <CurrentPlanCard workspaceId={workspaceId} />
      </section>

      {/* Plans */}
      <section>
        <div className="mb-4">
          <h2 className="font-semibold text-white">Choose a plan</h2>

          <p className="mt-1 text-sm text-zinc-500">
            Upgrade or change your workspace plan as your needs grow.
          </p>
        </div>

        <BillingPlans
          workspaceId={workspaceId}
          activePlan={activePlanData.data.plan}
        />
      </section>

      {/* Usage */}
      <section>
        <div className="mb-4">
          <h2 className="font-semibold text-white">Usage</h2>

          <p className="mt-1 text-sm text-zinc-500">
            Keep track of your workspace&apos;s current usage.
          </p>
        </div>

        <UsageOverview workspaceId={workspaceId} />
      </section>

      {/* Billing history */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Receipt className="size-4 text-violet-400" />

          <div>
            <h2 className="font-semibold text-white">Billing history</h2>

            <p className="mt-1 text-sm text-zinc-500">
              View your previous invoices and payments.
            </p>
          </div>
        </div>

        <BillingHistory workspaceId={workspaceId} />
      </section>
    </div>
  );
}
