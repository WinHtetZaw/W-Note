import { FileText, Folder, Sparkles, Users } from "lucide-react";

type UsageOverviewProps = {
  workspaceId: string;
};

const usage = [
  {
    label: "AI generations",
    used: 742,
    limit: 1000,
    icon: Sparkles,
  },
  {
    label: "Notes",
    used: 128,
    limit: 500,
    icon: FileText,
  },
  {
    label: "Folders",
    used: 18,
    limit: 50,
    icon: Folder,
  },
  {
    label: "Members",
    used: 4,
    limit: 10,
    icon: Users,
  },
];

export default function UsageOverview({ workspaceId }: UsageOverviewProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {usage.map((item) => {
        const Icon = item.icon;
        const percentage = Math.min((item.used / item.limit) * 100, 100);

        return (
          <div
            key={item.label}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-violet-500/10">
                  <Icon className="size-4 text-violet-400" />
                </div>

                <span className="text-sm font-medium text-zinc-300">
                  {item.label}
                </span>
              </div>

              <span className="text-sm text-zinc-500">
                {item.used} / {item.limit}
              </span>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-violet-500 transition-all"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <p className="mt-2 text-xs text-zinc-600">
              {Math.round(percentage)}% used
            </p>
          </div>
        );
      })}
    </div>
  );
}
