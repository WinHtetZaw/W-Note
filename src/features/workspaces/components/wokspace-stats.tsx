import { FileText, FolderTree, Users } from "lucide-react";
import { fetchWorkspaceOverview } from "../server/actions/fetch-workspace-overview";
import { GlassCard } from "@/components/ui/glass-card";

export default async function WorkspaceStats({
  workspaceId,
}: {
  workspaceId: string;
}) {
  const result = await fetchWorkspaceOverview(workspaceId);

  if (!result.success) {
    // todo implement not found workspace stat card
    return <>not found</>;
  }
  // console.log(result.data);
  const { noteCount, folderCount, memberCount } = result.data;

  const stats = [
    { label: "Total Notes", value: noteCount, icon: FileText },
    { label: "Folders", value: folderCount, icon: FolderTree },
    { label: "Members", value: memberCount, icon: Users },
  ];

  return (
    <div className="my-10 grid gap-6 md:grid-cols-3">
      {stats.map((stat) => (
        // <StatCard key={stat.label} {...stat} />
        <GlassCard key={stat.label} className="p-6 rounded-[28px]">
          <div className="flex items-center justify-between">
            <stat.icon className="h-6 w-6 text-violet-400" />
          </div>

          <h3 className="mt-6 text-4xl font-black">{stat.value}</h3>

          <p className="mt-2 text-zinc-400">{stat.label}</p>
        </GlassCard>
      ))}
    </div>
  );
}

// function StatCard({ label, value, icon: Icon }: any) {
//   return (
//     <GlassCard className="p-6 rounded-[28px]">
//       <div className="flex items-center justify-between">
//         <Icon className="h-6 w-6 text-violet-400" />
//       </div>

//       <h3 className="mt-6 text-4xl font-black">{value}</h3>

//       <p className="mt-2 text-zinc-400">{label}</p>
//     </GlassCard>
//   );
// }
