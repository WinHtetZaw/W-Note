import { FileText, FolderTree, Users } from "lucide-react";
import { fetchWorkspaceOverview } from "../server/actions/fetch-workspace-overview";
import { formatNumber } from "@/utils";
import { wait } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  workspaceId: string;
};

export default async function WorkspaceStats({ workspaceId }: Props) {
  const result = await fetchWorkspaceOverview(workspaceId);

  if (result.code)
    return (
      <p className="mt-8 text-muted text-center">Something wrong. Try again.</p>
    );

  const { noteCount, folderCount, memberCount } = result.data;

  const stats = [
    { label: "Total Notes", value: noteCount, icon: FileText },
    { label: "Folders", value: folderCount, icon: FolderTree },
    { label: "Members", value: memberCount, icon: Users },
  ];

  return (
    <div className="my-10 grid gap-6 md:grid-cols-3">
      {stats.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="p-6 glass rounded-3xl gap-6 flex flex-col items-center"
        >
          <h3 className="text-4xl font-black">{formatNumber(value)}</h3>
          <div className="flex gap-2 items-center justify-between">
            <p className=" text-muted">{label}</p>
            <Icon className="size-6 icon" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function WorkspaceStatsLoading() {
  return (
    <div className="my-10 grid gap-6 md:grid-cols-3">
      <Skeleton className="h-34 rounded-3xl" />
      <Skeleton className="h-34 rounded-3xl" />
      <Skeleton className="h-34 rounded-3xl" />
    </div>
  );
}
