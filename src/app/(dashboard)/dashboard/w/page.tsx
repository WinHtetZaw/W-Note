import Link from "next/link";
import { Plus, Sparkles } from "lucide-react";
import { Suspense } from "react";
import WorkspaceOverviewCard from "@/features/workspaces/components/workdspace-overview-card";

export default async function WorkspacePage() {
  return (
    <>
      {/* Head */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-violet-400" />
            Workspace Management
          </div>

          <h1 className="text-4xl font-black md:text-5xl">Your Workspaces</h1>

          <p className="mt-4 text-lg text-zinc-400">
            Organize teams, notes, and knowledge spaces.
          </p>
        </div>

        <Link
          href="w/new"
          className="flex items-center gap-2 rounded-2xl bg-violet-600 px-6 py-4 font-semibold transition hover:bg-violet-500"
        >
          <Plus className="h-5 w-5" />
          New Workspace
        </Link>
      </div>

      {/* Grid */}
      <Suspense fallback={<p>loading</p>}>
        <WorkspaceOverviewCard />
      </Suspense>
    </>
  );
}
