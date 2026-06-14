import WorkspaceForm from "@/features/workspaces/components/workspace-form";
import WorkspaceFormWrapper from "@/features/workspaces/components/workspace-form-wrapper";
import { fetchWorkspace } from "@/features/workspaces/server/actions/fetch-workspace";

type Props = {
  params: Promise<{ workspaceId: string }>;
};

export default async function WorkspaceFormPage({ params }: Props) {
  const workspaceId = (await params).workspaceId;
  const { data: workspace, success } = await fetchWorkspace(workspaceId);

  if (!success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
        <h1 className="text-2xl font-bold">Workspace not found</h1>
      </div>
    );
  }

  // console.log("Fetched workspace data:", workspace);

  return (
    <WorkspaceFormWrapper
      title="Workspace Setup"
      formTitle="Rename Workspace"
      desc="Configure your AI workspace settings."
    >
      <WorkspaceForm initialValues={workspace} />
    </WorkspaceFormWrapper>
  );
}
