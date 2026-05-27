import FormWrapper from "@/components/layout/form-wrapper";
import WorkspaceForm from "@/features/workspaces/components/workspace-form";

export default function WorkspaceFormPage() {
  return (
    <FormWrapper
      title="Workspace Setup"
      formTitle="Create New Workspace"
      desc="Configure your AI workspace settings."
    >
      <WorkspaceForm />
    </FormWrapper>
  );
}
