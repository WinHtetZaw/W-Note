import MainLoading from "@/components/ui/main-loaing";
import { fetchUserWorkspace } from "@/features/workspaces/server/actions/fetch-user-workspace";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function DashboardPage() {
  return (
    <Suspense fallback={<MainLoading />}>
      <DashboardPageContent />
    </Suspense>
  );
}

async function DashboardPageContent() {
  const result = await fetchUserWorkspace();

  if (result.code) {
    redirect("/dashboard/w/new");
  }

  return redirect(`/dashboard/w/${result.data.workspaceId}`);
}
