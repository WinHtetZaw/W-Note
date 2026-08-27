import { FileText, FolderTree, Users } from "lucide-react";
import { fetchWorkspaceOverview } from "../server/actions/fetch-workspace-overview";

export default async function WorkspaceStats({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const result = await fetchWorkspaceOverview((await params).workspaceId);

  if (!result.data) {
    // todo implement not found workspace stat card
    return <>not found</>;
  }
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
          <h3 className="text-4xl font-black">{value}</h3>
          <div className="flex gap-2 items-center justify-between">
            <p className=" text-muted">{label}</p>
            <Icon className="size-6 icon" />
          </div>
        </div>
      ))}
    </div>
  );
}
