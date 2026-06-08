import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import DashboardHeader from "@/components/layout/dashboard-header";
import { headers } from "next/headers";
import { Suspense } from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });

  // if (!session) {
  //   redirect("/sign-in");
  // }

  return (
    <main className="h-screen overflow-hidden bg-zinc-950 text-white">
      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-125 w-125 -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]" />
      </div>

      <div className="flex h-full">
        {/* Sidebar */}
        <Suspense fallback={<p>loading sidebar</p>}>
          <DashboardSidebar />
        </Suspense>

        {/* Main */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/50 scrollbar-track-transparent">
          {/* Topbar */}
          <DashboardHeader />

          {/* Content */}
          <div className="p-6">{children}</div>
        </div>
      </div>
    </main>
  );
}
