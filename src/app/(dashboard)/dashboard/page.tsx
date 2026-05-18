import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Brain,
  Search,
  Bell,
  Plus,
  Sparkles,
  FileText,
  FolderTree,
  Users,
  Clock3,
  ArrowUpRight,
  Zap,
  Activity,
} from "lucide-react";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // if (!session) {
  //   redirect("/sign-in");
  // }

  // export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]" />
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden min-h-screen w-72 border-r border-white/10 bg-zinc-950/80 backdrop-blur-xl lg:block">
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
                icon={<Sparkles className="h-5 w-5" />}
                label="Dashboard"
              />

              <SidebarItem
                icon={<FileText className="h-5 w-5" />}
                label="Notes"
              />

              <SidebarItem
                icon={<FolderTree className="h-5 w-5" />}
                label="Folders"
              />

              <SidebarItem
                icon={<Users className="h-5 w-5" />}
                label="Members"
              />
            </div>

            {/* Workspace */}
            <div className="mt-10">
              <p className="mb-4 text-sm font-medium text-zinc-500">
                WORKSPACES
              </p>

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

                <p className="mt-4 text-sm text-zinc-400">
                  72,000 / 100,000 used
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1">
          {/* Topbar */}
          <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl">
            <div className="flex h-20 items-center justify-between px-6">
              {/* Search */}
              <div className="hidden w-full max-w-xl items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 md:flex">
                <Search className="h-5 w-5 text-zinc-500" />

                <input
                  placeholder="Search notes..."
                  className="w-full bg-transparent outline-none placeholder:text-zinc-500"
                />
              </div>

              {/* Right */}
              <div className="ml-auto flex items-center gap-4">
                <button className="relative rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10">
                  <Bell className="h-5 w-5" />

                  <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-violet-500" />
                </button>

                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 font-bold">
                    Z
                  </div>

                  <div className="hidden md:block">
                    <p className="text-sm font-medium">Zeed</p>

                    <p className="text-xs text-zinc-400">Pro Plan</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="p-6">
            {/* Hero */}
            <section className="rounded-[36px] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl">
              <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-md">
                    <Sparkles className="h-4 w-4 text-violet-400" />
                    AI Productivity Dashboard
                  </div>

                  <h1 className="text-4xl font-black leading-tight md:text-6xl">
                    Welcome back,
                    <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                      {" "}
                      Zeed
                    </span>
                  </h1>

                  <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
                    Organize notes, manage workspaces, and use AI to accelerate
                    your productivity.
                  </p>
                </div>

                <button className="flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-8 py-4 text-lg font-semibold transition hover:bg-violet-500">
                  <Plus className="h-5 w-5" />
                  Create Note
                </button>
              </div>
            </section>

            {/* Stats */}
            <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <StatCard
                title="Total Notes"
                value="248"
                icon={<FileText className="h-6 w-6 text-violet-400" />}
              />

              <StatCard
                title="AI Generations"
                value="1,204"
                icon={<Sparkles className="h-6 w-6 text-violet-400" />}
              />

              <StatCard
                title="Workspaces"
                value="12"
                icon={<FolderTree className="h-6 w-6 text-violet-400" />}
              />

              <StatCard
                title="Team Members"
                value="34"
                icon={<Users className="h-6 w-6 text-violet-400" />}
              />
            </section>

            {/* Grid */}
            <section className="mt-8 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
              {/* Recent Notes */}
              <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Recent Notes</h2>

                    <p className="mt-2 text-zinc-400">
                      Recently updated workspace notes
                    </p>
                  </div>

                  <button className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-white/10">
                    View All
                  </button>
                </div>

                <div className="mt-8 space-y-4">
                  <RecentNote
                    title="AI SaaS Product Roadmap"
                    description="Updated pricing structure and onboarding flow."
                  />

                  <RecentNote
                    title="Meeting Notes"
                    description="AI summarized action items and tasks."
                  />

                  <RecentNote
                    title="Marketing Strategy"
                    description="Q3 campaign planning and SEO optimization."
                  />

                  <RecentNote
                    title="Next.js Architecture"
                    description="Feature-based folder structure planning."
                  />
                </div>
              </div>

              {/* Activity */}
              <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
                <div className="flex items-center gap-3">
                  <Activity className="h-6 w-6 text-violet-400" />

                  <div>
                    <h2 className="text-2xl font-bold">Activity</h2>

                    <p className="text-zinc-400">Latest workspace updates</p>
                  </div>
                </div>

                <div className="mt-8 space-y-6">
                  <ActivityItem
                    title="AI generated meeting summary"
                    time="2 minutes ago"
                  />

                  <ActivityItem
                    title="New workspace member invited"
                    time="10 minutes ago"
                  />

                  <ActivityItem
                    title="Project roadmap updated"
                    time="1 hour ago"
                  />

                  <ActivityItem title="Folder reorganized" time="3 hours ago" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

function SidebarItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
        active
          ? "bg-violet-600 text-white"
          : "text-zinc-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
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

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
      <div className="flex items-center justify-between">
        {icon}

        <ArrowUpRight className="h-5 w-5 text-zinc-500" />
      </div>

      <h3 className="mt-8 text-4xl font-black">{value}</h3>

      <p className="mt-2 text-zinc-400">{title}</p>
    </div>
  );
}

function RecentNote({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <button className="flex w-full items-start justify-between rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:bg-white/10">
      <div>
        <h3 className="font-semibold">{title}</h3>

        <p className="mt-2 text-sm leading-6 text-zinc-400">{description}</p>
      </div>

      <Clock3 className="h-5 w-5 text-zinc-500" />
    </button>
  );
}

function ActivityItem({ title, time }: { title: string; time: string }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 h-3 w-3 rounded-full bg-violet-500" />

      <div>
        <p className="font-medium">{title}</p>

        <p className="mt-1 text-sm text-zinc-400">{time}</p>
      </div>
    </div>
  );
}
