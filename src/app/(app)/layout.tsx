import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import DashboardHeader from "@/components/layout/dashboard-header";
import { headers } from "next/headers";
import { Suspense } from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen custom-scroll bg-zinc-950 text-white">
      {children}
    </main>
  );
}
