import { CreditCard, Receipt, Sparkles } from "lucide-react";
import CurrentPlanCard from "./current-plan-card";
import BillingPlans from "./billing-plans";
import UsageOverview from "./usage-overview";
import BillingHistory from "./billing-history";
import { fetchActiveSubscriptionPlan } from "../server/actions/fetch-active-subscripton-plan";
import PageHead from "@/components/dashboard/page-head";

type BillingPageProps = {
  params: Promise<{
    workspaceId: string;
  }>;
};

export default async function BillingPageContent({ params }: BillingPageProps) {
  const { workspaceId } = await params;
  const activePlanData = await fetchActiveSubscriptionPlan(workspaceId);
  if (activePlanData.code) {
    throw new Error("Unable to get active plan.");
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
      {/* <section>
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
      </section> */}
    </div>
  );
}
