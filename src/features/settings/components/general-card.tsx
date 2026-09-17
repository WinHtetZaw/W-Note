import SectionHeader from "@/components/dashboard/section-header";
import EditWorkspaceForm from "@/features/workspaces/components/edit-workspace-form";
import { fetchWorkspace } from "@/features/workspaces/server/actions/fetch-workspace";
import { Settings } from "lucide-react";
import { Suspense } from "react";

type Props = {
  params: Promise<{ workspaceId: string }>;
};

export default async function GeneralCard({ params }: Props) {
  const { workspaceId } = await params;
  const res = await fetchWorkspace(workspaceId);

  if (res.code) {
    throw new Error("Fail to fetch current workspace.");
  }
  const workspaceName = res.data.name;

  return (
    <section className="rounded-[32px] space-y-8 p-8 glass">
      <SectionHeader title="General" icon={<Settings />} />

      <Suspense fallback={<p>edit workspace form fallback</p>}>
        <EditWorkspaceForm workspaceName={workspaceName} />
      </Suspense>
    </section>
  );
}
