"use client";

import { CheckCircle2, CreditCard, ExternalLink } from "lucide-react";
import { useTransition } from "react";
import { createPortalSession } from "../server/actions/create-portal-session";

type CurrentPlanCardProps = {
  workspaceId: string;
};

export default function CurrentPlanCard({ workspaceId }: CurrentPlanCardProps) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      const res = await createPortalSession(workspaceId);

      if (res.code) {
        console.log(res);
        return;
      }
      console.log(res);

      if (res.data.url) {
        // window.location.href = res.data.url;
        window.open(res.data.url, "_blank");
      }
    });
  };
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
      <div className="flex flex-col gap-6 p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/10">
            <CreditCard className="size-5 text-icon" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold text-white">Pro</h3>

              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                <CheckCircle2 className="size-3" />
                Active
              </span>
            </div>

            <p className="mt-1 text-sm text-zinc-400">
              Your workspace is currently on the Pro plan.
            </p>

            <p className="mt-3 text-sm text-zinc-500">
              Next billing date:{" "}
              <span className="text-zinc-300">October 11, 2026</span>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleClick}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-zinc-200 transition hover:bg-white/10"
        >
          Manage billing
          <ExternalLink className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
