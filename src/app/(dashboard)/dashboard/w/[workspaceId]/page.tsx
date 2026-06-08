import Link from "next/link";
import {
  Plus,
  FileText,
  FolderTree,
  Users,
  Settings,
  Sparkles,
  Activity,
  ArrowRight,
  Edit2,
  EditIcon,
} from "lucide-react";
import WorkspaceDetailActions from "@/features/workspaces/components/workspace-detail-actions";
import { Suspense } from "react";

const stats = [
  { label: "Total Notes", value: 128, icon: FileText },
  { label: "Folders", value: 14, icon: FolderTree },
  { label: "Members", value: 6, icon: Users },
];

const recentActivity = [
  "Alex created a new note",
  "AI summarized meeting notes",
  "Sarah updated roadmap",
  "New folder created: Marketing",
];

type Props = {
  params: Promise<{ workspaceId: string }>;
};

export default async function WorkspaceDetailPage() {
  // const { workspaceId } = await params;

  // console.log("Workspace ID:", workspaceId);
  return (
    <>
      {/* Head */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-violet-400" />
            Workspace Overview
          </div>

          <h1 className="text-4xl font-black md:text-5xl">Startup Team</h1>

          <p className="mt-4 text-lg text-zinc-400">
            Manage your team, notes, and AI workflows.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-2xl bg-violet-600 px-6 py-4 font-semibold transition hover:bg-violet-500">
            <Plus className="h-5 w-5" />
            New Note
          </button>

          {/* <button className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
            <Settings className="h-5 w-5" />
          </button> */}
          <Suspense fallback={<p>loading</p>}>
            <WorkspaceDetailActions />
          </Suspense>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="mt-10 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        {/* Notes Preview */}
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recent Notes</h2>

            <Link
              href="notes"
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 space-y-4">
            <NoteRow title="AI Roadmap" />
            <NoteRow title="Marketing Plan" />
            <NoteRow title="System Design Notes" />
            <NoteRow title="Team Meeting Summary" />
          </div>
        </div>

        {/* Activity */}
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-violet-400" />

            <h2 className="text-2xl font-bold">Activity</h2>
          </div>

          <div className="mt-8 space-y-5">
            {recentActivity.map((item) => (
              <ActivityItem key={item} text={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <QuickAction label="Manage Members" />
        <QuickAction label="Workspace Settings" />
        <QuickAction label="AI Usage Analytics" />
      </div>
    </>
  );
}

function StatCard({ label, value, icon: Icon }: any) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
      <div className="flex items-center justify-between">
        <Icon className="h-6 w-6 text-violet-400" />
      </div>

      <h3 className="mt-6 text-4xl font-black">{value}</h3>

      <p className="mt-2 text-zinc-400">{label}</p>
    </div>
  );
}

function NoteRow({ title }: { title: string }) {
  return (
    <button className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10">
      <span className="font-medium">{title}</span>

      <FileText className="h-4 w-4 text-violet-400" />
    </button>
  );
}

function ActivityItem({ text }: { text: string }) {
  return (
    <div className="flex gap-3">
      <div className="mt-2 h-2 w-2 rounded-full bg-violet-500" />

      <p className="text-sm text-zinc-300">{text}</p>
    </div>
  );
}

function QuickAction({ label }: { label: string }) {
  return (
    <button className="rounded-[28px] border border-white/10 bg-white/5 p-6 text-left backdrop-blur-2xl transition hover:bg-white/10">
      <h3 className="font-semibold">{label}</h3>

      <p className="mt-2 text-sm text-zinc-400">Manage and configure</p>
    </button>
  );
}
