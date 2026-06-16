import { fetchUserWorkspace } from "@/features/workspaces/server/actions/fetch-user-workspace";
import {
  Plus,
  Sparkles,
  FileText,
  FolderTree,
  Users,
  Clock3,
  ArrowUpRight,
  Activity,
} from "lucide-react";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const result = await fetchUserWorkspace();

  if (!result.success) {
    redirect("/dashboard/w/new");
  }

  redirect(`/dashboard/w/${result.data.workspaceId}`);
  return (
    <>
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
              Organize notes, manage workspaces, and use AI to accelerate your
              productivity.
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

            <ActivityItem title="Project roadmap updated" time="1 hour ago" />

            <ActivityItem title="Folder reorganized" time="3 hours ago" />
          </div>
        </div>
      </section>
    </>
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
