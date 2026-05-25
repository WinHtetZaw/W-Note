import WorkspaceForm from "@/features/workspaces/components/workspace-form";
import WorkspaceFormWrapper from "@/features/workspaces/components/workspace-form-wrapper";
import { fetchWorkspaceById } from "@/features/workspaces/server/actions";

type Props = {
  params: Promise<{ workspaceId: string }>;
};

export default async function WorkspaceFormPage({ params }: Props) {
  const workspaceId = (await params).workspaceId;
  const { data: workspace, success } = await fetchWorkspaceById(workspaceId);

  if (!success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
        <h1 className="text-2xl font-bold">Workspace not found</h1>
      </div>
    );
  }

  // console.log("Fetched workspace data:", workspace);

  return (
    <WorkspaceFormWrapper>
      <WorkspaceForm isEditForm={true} oldWorkspace={workspace} />
    </WorkspaceFormWrapper>
  );
}
