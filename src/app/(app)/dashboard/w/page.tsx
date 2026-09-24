import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Check,
  FileText,
  Plus,
  Sparkles,
  Users,
} from "lucide-react";
import { Suspense } from "react";
import { fetchUserWorkspaces } from "@/features/workspaces/server/actions/fetch-user-workspaces";
import MainLoading from "@/components/ui/main-loaing";
import { redirect } from "next/navigation";
import PageHead from "@/components/dashboard/page-head";
import DashboardHeader from "@/components/layout/dashboard-header";
import { SubscriptionPlans } from "@/features/billing/constants/billing.constants";

export default function WorkspacePage() {
  return (
    <>
      <DashboardHeader />
      <Suspense fallback={<MainLoading />}>
        <WrorkspacePageContent />
      </Suspense>
    </>
  );
}

async function WrorkspacePageContent() {
  const result = await fetchUserWorkspaces();

  if (result.code || result.data.length === 0) {
    redirect("/dashboard/w/new");
  }

  const workspaces = result.data;

  const planStyles = {
    free: {
      label: "Free",
      className: "bg-zinc-500/10 text-zinc-400",
    },
    pro: {
      label: "Pro",
      className: "bg-violet-500/10 text-violet-400",
    },
    team: {
      label: "Team",
      className: "bg-blue-500/10 text-blue-400",
    },
  } satisfies Record<
    SubscriptionPlans,
    {
      label: string;
      className: string;
    }
  >;

  return (
    <div className="wax-w-5xl mx-auto p-12">
      <PageHead
        pageLabel="Workspaces"
        title="Choose a workspace"
        subTitle="Select a workspace to continue working on your notes."
      >
        <Link
          href="w/new"
          className="flex items-center gap-2 rounded-2xl bg-violet-600 px-6 py-4 font-semibold transition hover:bg-violet-500"
        >
          <Plus className="h-5 w-5" />
          New Workspace
        </Link>
      </PageHead>

      {/* Grid */}
      {/* <Suspense fallback={<p>loading</p>}>
        <WorkspaceOverviewCard />
      </Suspense> */}

      {
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {workspaces.map((membership) => {
            const workspace = membership.workspace;

            const plan = workspace.subscription?.plan ?? "free";

            const planStyle = planStyles[plan];

            return (
              <Link
                key={workspace.id}
                href={`/dashboard/w/${workspace.id}`}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition hover:border-violet-500/30 hover:bg-white/[0.05]"
              >
                {/* Hover glow */}
                <div
                  aria-hidden="true"
                  className="absolute -right-16 -top-16 size-32 rounded-full bg-violet-500/10 opacity-0 blur-3xl transition group-hover:opacity-100"
                />

                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-violet-500/10">
                      <Briefcase className="size-5 text-violet-400" />
                    </div>

                    <ArrowRight className="size-5 text-zinc-600 transition group-hover:translate-x-1 group-hover:text-violet-400" />
                  </div>

                  <div className="mt-5 flex items-center gap-2">
                    <h2 className="min-w-0 truncate text-lg font-semibold text-white">
                      {workspace.name}
                    </h2>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${planStyle.className}`}
                    >
                      {planStyle.label}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-5 text-sm text-zinc-500">
                    <div className="flex items-center gap-1.5">
                      <Users className="size-4" />
                      <span>Workspace</span>
                    </div>

                    {workspace.subscription?.status === "active" && (
                      <div className="flex items-center gap-1.5 text-emerald-500">
                        <Check className="size-3.5" />
                        <span>Active</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      }

      {/* Empty state */}
      {workspaces.length === 0 && (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center backdrop-blur-xl">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-violet-500/10">
            <Briefcase className="size-6 text-violet-400" />
          </div>

          <h2 className="mt-5 text-lg font-semibold text-white">
            No workspaces yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
            Create your first workspace to start organizing your notes.
          </p>

          <Link
            href="/dashboard/w/new"
            className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-violet-500 px-4 text-sm font-semibold text-white transition hover:bg-violet-400"
          >
            <Plus className="size-4" />
            Create workspace
          </Link>
        </div>
      )}
    </div>
  );
}
