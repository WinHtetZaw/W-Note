import { CreditCard, Receipt, Sparkles } from "lucide-react";
import CurrentPlanCard from "./current-plan-card";
import BillingPlans from "./billing-plans";
import UsageOverview from "./usage-overview";
import { fetchActiveSubscriptionPlan } from "../server/actions/fetch-active-subscripton-plan";
import PageHead from "@/components/dashboard/page-head";
import { fetchAIUsageStatus } from "@/features/ai/server/actions/fetch-ai-usage-status";

type BillingPageProps = {
  params: Promise<{
    workspaceId: string;
  }>;
};

export default async function BillingPageContent({ params }: BillingPageProps) {
  const { workspaceId } = await params;
  const activePlanData = await fetchActiveSubscriptionPlan(workspaceId);
  const aiUsage = await fetchAIUsageStatus(workspaceId);

  if (activePlanData.code) {
    throw new Error("Unable to get active plan.");
  }

  if (aiUsage.code) {
    throw new Error("Fail to get AI Usage.");
  }

  return (
    <div className="space-y-8">
      <PageHead
        title="Billing & Plans"
        pageLabel="Workspace billing"
        subTitle="Manage your workspace subscription, AI usage, and billing information."
      />

      {/* Current plan */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <CreditCard className="size-4 text-icon" />

          <h2 className="font-semibold">Current plan</h2>
        </div>

        <CurrentPlanCard
          workspaceId={workspaceId}
          plan={activePlanData.data.plan}
          status={aiUsage.data.status}
          currentPeriodEnd={aiUsage.data.currentPeriodEnd}
          cancelAtPeriodEnd={aiUsage.data.cancelAtPeriodEnd}
        />
      </section>

      {/* Plans */}
      <section id="plans">
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
    </div>
  );
}
