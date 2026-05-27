import Link from "next/link";
import {
  Brain,
  Plus,
  Users,
  FileText,
  FolderTree,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { fetchUserWorkspaces } from "@/features/workspaces/server/actions";

const workspaces = [
  {
    id: "1",
    name: "Personal",
    members: 1,
    notes: 24,
    folders: 6,
  },
  {
    id: "2",
    name: "Startup Team",
    members: 8,
    notes: 132,
    folders: 18,
  },
  {
    id: "3",
    name: "Design Agency",
    members: 5,
    notes: 67,
    folders: 10,
  },
];

export default async function WorkspacePage() {
  const workspaces2 = (await fetchUserWorkspaces()).data?.map(
    (ws) => ws.workspace,
  );
  // const workspaces2 = await fetchUserWorkspaces();
  console.log("Fetched workspaces:", workspaces2);
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
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {workspaces.map((ws) => (
          <WorkspaceCard key={ws.id} {...ws} />
        ))}
        {workspaces2?.map((ws) => (
          <Link href={`w/${ws.id}`} key={ws.id} className="bg-rose-500">
            <p>{ws.name}</p>
          </Link>
        ))}
      </div>
    </>
  );
}

function WorkspaceCard({
  id,
  name,
  members,
  notes,
  folders,
}: {
  id: string;
  name: string;
  members: number;
  notes: number;
  folders: number;
}) {
  return (
    <Link
      href={`/workspace/${id}/notes`}
      className="group rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl transition hover:bg-white/10"
    >
      <div className="flex items-center justify-between">
        <div className="rounded-2xl bg-violet-500/10 p-3">
          <Brain className="h-6 w-6 text-violet-400" />
        </div>

        <ArrowRight className="h-5 w-5 text-zinc-500 transition group-hover:text-white" />
      </div>

      <h2 className="mt-6 text-2xl font-bold">{name}</h2>

      <div className="mt-6 grid grid-cols-3 gap-4 text-sm text-zinc-400">
        <div className="flex flex-col gap-1">
          <Users className="h-4 w-4 text-violet-400" />
          {members} members
        </div>

        <div className="flex flex-col gap-1">
          <FileText className="h-4 w-4 text-violet-400" />
          {notes} notes
        </div>

        <div className="flex flex-col gap-1">
          <FolderTree className="h-4 w-4 text-violet-400" />
          {folders} folders
        </div>
      </div>

      <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10">
        Open Workspace
      </button>
    </Link>
  );
}
