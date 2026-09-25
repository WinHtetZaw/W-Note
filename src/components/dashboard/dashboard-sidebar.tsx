import Link from "next/link";
import { Brain } from "lucide-react";
import { SidebarNavItem } from "./sidebar-nav-item";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { AIUsageCard } from "./ai-usage-card";
import { toolsLinks, workspaceLinks } from "./dashboard-sidebar-data";
import { redirect } from "next/navigation";
import { fetchUserWorkspaces } from "@/features/workspaces/server/actions/fetch-user-workspaces";
import { fetchWorkspace } from "@/features/workspaces/server/actions/fetch-workspace";
import CreateNoteButton from "@/features/notes/components/create-note-button";
import { DashboardSidebarContent } from "./dashboard-sidebar-content";
import { MobileDashboardSidebar } from "./mobile-dashboard-sidebar";

type Props = {
  params: Promise<{ workspaceId: string }>;
};

export async function DashboardSidebar({ params }: Props) {
  const currentWsId = await params;
  const currentWorkspace = await fetchWorkspace(currentWsId.workspaceId);
  const workspacesData = await fetchUserWorkspaces();

  if (!currentWorkspace.data || !workspacesData.data) {
    return redirect("/dashboard/w/new");
  }

  const workspaceId = currentWorkspace.data.id;
  const workspaces = workspacesData.data.map((el) => el.workspace);

  const content = (
    <DashboardSidebarContent
      workspaceId={currentWorkspace.data.id}
      workspaceName={currentWorkspace.data.name}
      workspaces={workspaces}
    />
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden h-screen w-72 shrink-0 overflow-y-auto border-r backdrop-blur-xl scrollbar-none lg:block">
        {content}
      </aside>

      {/* Mobile */}
      <MobileDashboardSidebar>{content}</MobileDashboardSidebar>
    </>
  );
}
