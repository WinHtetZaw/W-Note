import { redirect } from "next/navigation";
import { fetchUserWorkspaces } from "@/features/workspaces/server/actions/fetch-user-workspaces";
import { fetchWorkspace } from "@/features/workspaces/server/actions/fetch-workspace";
import { DashboardSidebarContent } from "./dashboard-sidebar-content";
import { MobileDashboardSidebar } from "./mobile-dashboard-sidebar";

type Props = {
  params: Promise<{ workspaceId: string }>;
};

export async function DashboardSidebar({ params }: Props) {
  const currentWsId = await params;
  const currentWorkspace = await fetchWorkspace(currentWsId.workspaceId);
  const workspacesData = await fetchUserWorkspaces();

  if (!currentWorkspace.data) {
    return redirect("/dashboard/w");
  }

  if (!workspacesData.data || workspacesData.data.length === 0) {
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
