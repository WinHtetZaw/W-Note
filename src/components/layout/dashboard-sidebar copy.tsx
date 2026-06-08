import {
  Brain,
  FileText,
  FolderTree,
  Plus,
  Settings,
  Sparkles,
  Umbrella,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default function DashboardSidebar() {
  return (
    <aside className="hidden min-h-screen overflow-y-auto scrollbar-none w-72 border-r border-white/10 bg-zinc-950/80 backdrop-blur-xl lg:block">
      <div className="flex h-20 items-center border-b border-white/10 px-6">
        <Link href="/" className="flex items-center gap-3">
          <Brain className="h-8 w-8 text-violet-400" />

          <div>
            <h2 className="text-lg font-bold">NoteAI</h2>

            <p className="text-xs text-zinc-400">AI Workspace</p>
          </div>
        </Link>
      </div>

      <div className="p-6">
        {/* Create Button */}
        <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 px-4 py-4 font-semibold transition hover:bg-violet-500">
          <Plus className="h-5 w-5" />
          New Note
        </button>

        {/* Navigation */}
        <div className="mt-10 space-y-2">
          <SidebarItem
            active
            link=""
            icon={<Sparkles className="h-5 w-5" />}
            label="Dashboard"
          />

          <SidebarItem
            link="notes"
            icon={<FileText className="h-5 w-5" />}
            label="Notes"
          />

          <SidebarItem
            link="folders"
            icon={<FolderTree className="h-5 w-5" />}
            label="Folders"
          />

          <SidebarItem
            link="members"
            icon={<Users className="h-5 w-5" />}
            label="Members"
          />
          <SidebarItem
            link="billing"
            icon={<Umbrella className="h-5 w-5" />}
            label="Billing"
          />
          <SidebarItem
            link="settings"
            icon={<Settings className="h-5 w-5" />}
            label="Settings"
          />
        </div>

        {/* Workspace */}
        <div className="mt-10">
          <p className="mb-4 text-sm font-medium text-zinc-500">WORKSPACES</p>

          <div className="space-y-3">
            <WorkspaceItem name="Personal" color="bg-violet-500" />

            <WorkspaceItem name="Startup" color="bg-blue-500" />

            <WorkspaceItem name="Design Team" color="bg-pink-500" />
          </div>
        </div>

        {/* AI Usage */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-violet-400" />

            <h3 className="font-semibold">AI Usage</h3>
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">Monthly Tokens</span>

              <span>72%</span>
            </div>

            <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[72%] rounded-full bg-violet-500" />
            </div>

            <p className="mt-4 text-sm text-zinc-400">72,000 / 100,000 used</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

type SidebarItemProps = {
  icon: React.ReactNode;
  link?: string;
  label: string;
  active?: boolean;
};

function SidebarItem(props: SidebarItemProps) {
  const { icon, link = "#", label, active = false } = props;
  return (
    <Link
      href={`/dashboard/${link}`}
      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
        active
          ? "bg-violet-600 text-white"
          : "text-zinc-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
}

function WorkspaceItem({ name, color }: { name: string; color: string }) {
  return (
    <button className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition hover:bg-white/5">
      <div className={`h-3 w-3 rounded-full ${color}`} />

      <span>{name}</span>
    </button>
  );
}
