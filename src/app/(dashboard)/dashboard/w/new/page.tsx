import FormWrapper from "@/components/layout/form-wrapper";
import WorkspaceForm from "@/features/workspaces/components/workspace-form";

export default function WorkspaceFormPage() {
  return (
    <div className="px-6 py-10 relative h-full flex justify-center items-center">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-150 w-150 -translate-x-1/2 rounded-full bg-violet-600/20 blur-[160px]" />
      </div>
      <FormWrapper
        title="Workspace Setup"
        formTitle="Create New Workspace"
        desc="Configure your AI workspace settings."
      >
        <WorkspaceForm />
      </FormWrapper>
    </div>
  );
}
