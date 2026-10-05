import SectionHeader from "@/components/dashboard/section-header";
import { fetchWorkspaceusage } from "@/features/workspaces/server/actions/fetch-workspace-usage";
import {
  Activity,
  ArrowUpRight,
  FileText,
  Folder,
  Sparkles,
  Users,
} from "lucide-react";

type UsageOverviewProps = {
  workspaceId: string;
};

const usageConfig = [
  {
    key: "ai",
    label: "AI generations",
    description: "Monthly AI requests",
    icon: Sparkles,
    color: "violet",
  },
  {
    key: "notes",
    label: "Notes",
    description: "Workspace notes",
    icon: FileText,
    color: "blue",
  },
  {
    key: "folders",
    label: "Folders",
    description: "Organized content",
    icon: Folder,
    color: "amber",
  },
  {
    key: "members",
    label: "Members",
    description: "Workspace members",
    icon: Users,
    color: "emerald",
  },
] as const;

function getUsagePercentage(used: number, limit: number) {
  if (limit <= 0) return 100;

  return Math.min(Math.round((used / limit) * 100), 100);
}

function getUsageColor(percentage: number) {
  if (percentage >= 90) {
    return {
      bar: "bg-red-500",
      text: "text-red-400",
      track: "bg-red-500/10",
    };
  }

  if (percentage >= 75) {
    return {
      bar: "bg-amber-500",
      text: "text-amber-400",
      track: "bg-amber-500/10",
    };
  }

  return {
    bar: "bg-violet-500",
    text: "text-violet-400",
    track: "bg-white/5",
  };
}

export default async function UsageOverview({
  workspaceId,
}: UsageOverviewProps) {
  const result = await fetchWorkspaceusage(workspaceId);

  if (result.code) {
    throw new Error("Fail to fetch workspace usage.");
  }

  const usage = result.data;

  const usageData = {
    ai: usage.ai,
    notes: usage.notes,
    folders: usage.folders,
    members: usage.members,
  };

  return (
    <section className="space-y-5">
      {/* Overview header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-violet-500/10">
            <Activity className="size-4 text-violet-400" />
          </div>

          <div>
            <h3 className="text-sm font-medium text-foreground">
              Resource consumption
            </h3>

            <p className="text-xs text-muted">
              Current {usage.plan} plan usage
            </p>
          </div>
        </div>

        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-400">
          Live usage
        </span>
      </div>

      {/* Usage cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {usageConfig.map((item) => {
          const Icon = item.icon;
          const resource = usageData[item.key];

          const isUnlimited = resource.limit === null;

          const percentage =
            resource.limit === null
              ? 0
              : getUsagePercentage(resource.used, resource.limit);

          const colors = getUsageColor(percentage);

          const remaining =
            resource.limit === null
              ? null
              : Math.max(resource.limit - resource.used, 0);

          return (
            <div
              key={item.key}
              // className="group relative overflow-hidden p-5 rounded-[32px] border border-white/10 bg-white/3 backdrop-blur-xl transition-colors hover:border-white/15 hover:bg-white/4.5"
              className="group relative overflow-hidden p-5 rounded-[32px] border border-white/10 bg-white/3 backdrop-blur-xl transition-colors hover:border-white/15 hover:bg-white/4.5"
            >
              {/* Subtle hover glow */}
              <div className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-violet-500/4 blur-3xl transition-colors group-hover:bg-violet-500/8" />

              <div className="relative">
                {/* Card header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-violet-500/10">
                      <Icon className="size-4.5 text-violet-400" />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-zinc-200">
                        {item.label}
                      </p>

                      <p className="mt-0.5 text-xs text-zinc-500">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight className="size-4 text-zinc-600 transition-colors group-hover:text-zinc-400" />
                </div>

                {/* Usage numbers */}
                <div className="mt-6 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-3xl font-semibold tracking-tight text-white tabular-nums">
                      {resource.used.toLocaleString()}
                    </p>

                    <p className="mt-1 text-xs text-zinc-500">
                      {resource.limit === null
                        ? "Resources used"
                        : `of ${resource.limit.toLocaleString()} allowed`}
                    </p>
                  </div>

                  {isUnlimited ? (
                    <span className="rounded-full border border-emerald-500/15 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                      Unlimited
                    </span>
                  ) : (
                    <span
                      className={`text-sm font-medium tabular-nums ${colors.text}`}
                    >
                      {percentage}%
                    </span>
                  )}
                </div>

                {/* Progress */}
                <div className="mt-4">
                  <div
                    className={`h-1.5 overflow-hidden rounded-full ${
                      isUnlimited ? "bg-emerald-500/10" : colors.track
                    }`}
                  >
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isUnlimited ? "w-full bg-emerald-500/60" : colors.bar
                      }`}
                      style={{
                        width: isUnlimited ? "100%" : `${percentage}%`,
                      }}
                    />
                  </div>

                  <div className="mt-2 flex items-center justify-between gap-2">
                    <span className="text-xs text-zinc-500">
                      {resource.limit === null
                        ? "No usage limit"
                        : remaining === 0
                          ? "Limit reached"
                          : `${remaining?.toLocaleString()} remaining`}
                    </span>

                    {item.key === "ai" && (
                      <span className="text-xs text-zinc-600">
                        Resets monthly
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
