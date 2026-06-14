import Link from "next/link";
import { fetchWorkspacesOverview } from "../server/actions/fetch-workspaces-overview";
import { ArrowRight, Brain, FileText, FolderTree, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pluralize } from "@/lib/utils";

export default async function WorkspaceOverviewCard() {
  const result = await fetchWorkspacesOverview();

  if (!result.success) {
    // todo implement workspace not found card
    return <p>no workspace found</p>;
  }

  const workspaces = result.data;

  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {workspaces.map((wp) => (
        <Link
          key={wp.id}
          href={`/workspace/${wp.id}/notes`}
          className="group rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl transition hover:bg-white/10"
        >
          <div className="flex items-center justify-between">
            <div className="rounded-2xl bg-violet-500/10 p-3">
              <Brain className="h-6 w-6 text-violet-400" />
            </div>

            <ArrowRight className="h-5 w-5 text-zinc-500 transition group-hover:text-white" />
          </div>

          <h2 className="mt-6 text-2xl font-bold">{wp.name}</h2>

          <div className="mt-6 grid grid-cols-3 gap-4 text-sm text-zinc-400">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-violet-400" />
              {pluralize(wp.memberCount, "member")}
            </div>

            <div className="flex items-center gap-1">
              <FileText className="h-4 w-4 text-violet-400" />
              {pluralize(wp.noteCount, "note")}
            </div>

            <div className="flex items-center gap-1">
              <FolderTree className="h-4 w-4 text-violet-400" />
              {pluralize(wp.folderCount, "folder")}
            </div>
          </div>

          <Button variant={"outline"}>Open Workspace</Button>
        </Link>
      ))}
    </div>
  );
}
