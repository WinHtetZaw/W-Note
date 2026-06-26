import Link from "next/link";
import { Brain } from "lucide-react";
import { SidebarNavItem } from "./sidebar-nav-item";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { AIUsageCard } from "./ai-usage-card";
import {
  aiLinks,
  generalLinks,
  workspaceLinks,
} from "./dashboard-sidebar-data";
import AddNoteButton from "../ui/note-create-button";
import { redirect } from "next/navigation";
import { fetchUserWorkspace } from "@/features/workspaces/server/actions/fetch-user-workspace";

export async function DashboardSidebar() {
  const result = await fetchUserWorkspace();

  if (!result.success) {
    return redirect("/dashboard/w/new");
  }

  const { workspaceId } = result.data;

  return (
    <aside className="hidden w-72 h-screen overflow-y-auto scrollbar-none border-r backdrop-blur-xl lg:block">
      <div className="flex h-20 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-3">
          <Brain className="size-8 text-primary" />
          <div>
            <h2 className="font-bold">NoteAI</h2>
            <p className="text-xs text-muted">AI Workspace</p>
          </div>
        </Link>
      </div>

      <div className="space-y-8 p-6">
        <WorkspaceSwitcher />
        <AddNoteButton
          variant="outline"
          workspaceId={workspaceId}
          className="w-full"
        />
        {/* <div className="space-y-2">
          {generalLinks.map((item) => (
            <SidebarNavItem
              key={item.label}
              label={item.label}
              icon={item.icon}
              href={`/dashboard/w/${workspaceId}`}
            />
          ))}
        </div> */}

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
            AI
          </p>

          <div className="space-y-2">
            {aiLinks.map((item) => (
              <SidebarNavItem
                key={item.label}
                label={item.label}
                icon={item.icon}
                href={`/dashboard/w/${workspaceId}/${item.href}`}
              />
            ))}
          </div>
        </div>

        <AIUsageCard />
      </div>
    </aside>
  );
}
