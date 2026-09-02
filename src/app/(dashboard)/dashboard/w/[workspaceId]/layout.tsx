import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { SidebarSkeleton } from "@/components/dashboard/sidebar-skeleton";
import DashboardHeader from "@/components/layout/dashboard-header";
import { Suspense } from "react";

type Props = {
  children: React.ReactNode;
  params: Promise<{ workspaceId: string }>;
};

export default async function WorkspaceLayout({ children, params }: Props) {
  return (
    <>
      <div className="flex h-full">
        <Suspense fallback={<SidebarSkeleton />}>
          <DashboardSidebar params={params} />
        </Suspense>

        <div className="flex-1 flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-white/50 scrollbar-track-transparent">
          <DashboardHeader />

          <div className="p-6 relative flex-1">
            <div className="pointer-events-none w-full md:w-[calc(100%-18rem)] h-full fixed top-0 right-0 overflow-hidden">
              <div className="absolute left-1/2 top-0 h-100 w-100 -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]" />
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
