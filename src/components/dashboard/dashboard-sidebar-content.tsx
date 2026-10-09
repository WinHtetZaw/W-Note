import Link from "next/link";
import { Brain } from "lucide-react";
import { SidebarNavItem } from "./sidebar-nav-item";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { AIUsageCard } from "./ai-usage-card";
import { toolsLinks, workspaceLinks } from "./dashboard-sidebar-data";
import CreateNoteButton from "@/features/notes/components/create-note-button";

type Props = {
  workspaceId: string;
  workspaceName: string;
  workspaces: {
    id: string;
    name: string;
  }[];
};

export function DashboardSidebarContent({
  workspaceId,
  workspaceName,
  workspaces,
}: Props) {
  return (
    <>
      <div className="sticky min-h-20 lg:sticky top-0 z-50 flex h-20 items-center px-6 header-bg">
        <Link href="/" className="flex items-center gap-3">
          <Brain className="size-8 text-primary" />

          <div>
            <h2 className="font-bold">NoteAI</h2>
            <p className="text-xs text-muted">AI Workspace</p>
          </div>
        </Link>
      </div>

      <div className="space-y-8 p-8">
        <WorkspaceSwitcher
          userWorkspaces={workspaces}
          currentName={workspaceName}
        />

        <CreateNoteButton workspaceId={workspaceId} className="w-full" />

        <div>
          <p className="mb-3 px-4 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
            Workspace
          </p>

          <div className="space-y-2">
            {workspaceLinks.map((item) => (
              <SidebarNavItem
                key={item.label}
                label={item.label}
                icon={item.icon}
                href={`/dashboard/w/${workspaceId}/${item.href}`}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 px-4 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
            Tools
          </p>

          <div className="space-y-2">
            {toolsLinks.map((item) => (
              <SidebarNavItem
                key={item.label}
                label={item.label}
                icon={item.icon}
                href={`/dashboard/w/${workspaceId}/${item.href}`}
              />
            ))}
          </div>
        </div>

        <AIUsageCard workspaceId={workspaceId} />
      </div>
    </>
  );
}
