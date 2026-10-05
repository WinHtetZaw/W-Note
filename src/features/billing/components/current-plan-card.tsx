"use client";

import {
  AlertCircle,
  CheckCircle2,
  CreditCard,
  ExternalLink,
  LucideIcon,
  Sparkles,
} from "lucide-react";
import { useTransition } from "react";
import { createPortalSession } from "../server/actions/create-portal-session";
import { Button } from "@/components/ui/button";
import { SubscriptionPlans } from "../constants/billing.constants";
import { SubscriptionStatus } from "../types/billing.types";

type CurrentPlanCardProps = {
  workspaceId: string;
  plan: SubscriptionPlans;
  status: SubscriptionStatus;
  currentPeriodEnd: Date | string | null;
  cancelAtPeriodEnd: boolean;
};

const PLAN_INFO = {
  free: {
    label: "Free",
    description: "Your workspace is currently on the Free plan.",
  },
  pro: {
    label: "Pro",
    description: "Your workspace is currently on the Pro plan.",
  },
  team: {
    label: "Team",
    description: "Your workspace is currently on the Team plan.",
  },
} satisfies Record<
  CurrentPlanCardProps["plan"],
  {
    label: string;
    description: string;
  }
>;

const STATUS_INFO = {
  active: {
    label: "Active",
    className: "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20",
    icon: CheckCircle2,
  },
  canceled: {
    label: "Canceled",
    className: "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20",
    icon: AlertCircle,
  },
  past_due: {
    label: "Past due",
    className: "bg-red-500/10 text-red-400 ring-1 ring-red-500/20",
    icon: AlertCircle,
  },
} satisfies Record<
  CurrentPlanCardProps["status"],
  {
    label: string;
    className: string;
    icon: LucideIcon;
  }
>;

function formatDate(date: Date | string | null) {
  if (!date) return null;

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default function CurrentPlanCard({
  workspaceId,
  plan,
  status,
  currentPeriodEnd,
  cancelAtPeriodEnd,
}: CurrentPlanCardProps) {
  const [isPending, startTransition] = useTransition();

  const planInfo = PLAN_INFO[plan];
  const statusInfo = STATUS_INFO[status];
  const StatusIcon = statusInfo.icon;

  const billingDate = formatDate(currentPeriodEnd);

  const handleClick = () => {
    startTransition(async () => {
      const res = await createPortalSession(workspaceId);

      if (res.code) {
        console.error(res);
        return;
      }

      if (res.data.url) {
        // window.open(res.data.url, "_blank", "noopener,noreferrer");
        window.location.href = res.data.url;
      }
    });
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
      {/* Subtle plan glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 size-48 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative flex flex-col gap-6 p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
        {/* Plan information */}
        <div className="flex min-w-0 items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-violet-500/10 bg-violet-500/10">
            <CreditCard className="size-5 text-icon" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold text-white">
                {planInfo.label}
              </h3>

              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${statusInfo.className}`}
              >
                <StatusIcon className="size-3" />
                {statusInfo.label}
              </span>
            </div>

            <p className="mt-1 text-sm text-muted">{planInfo.description}</p>

            {billingDate && plan !== "free" && (
              <div className="mt-3 flex items-center gap-2 text-sm">
                <span className="text-zinc-500">
                  {cancelAtPeriodEnd ? "Access until:" : "Next billing date:"}
                </span>

                <span className="font-medium text-foreground/80">
                  {billingDate}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Action */}
        <div className="flex shrink-0">
          {plan === "free" ? (
            <Button
              type="button"
              className="h-10 rounded-xl px-4"
              onClick={() => {
                document
                  .getElementById("plans")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Sparkles className="mr-2 size-3.5" />
              Upgrade plan
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={handleClick}
              disabled={isPending}
              className="h-10 rounded-xl px-4 text-sm font-medium"
            >
              {isPending ? "Opening..." : "Manage billing"}
              {!isPending && <ExternalLink className="ml-2 size-3.5" />}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
