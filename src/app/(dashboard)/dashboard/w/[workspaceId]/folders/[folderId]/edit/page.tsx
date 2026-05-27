import FormWrapper from "@/components/layout/form-wrapper";
import FolderForm from "@/features/folders/components/folder-form";
import { fetchFolder } from "@/features/folders/server/actions";
import { Suspense } from "react";

type Props = {
  params: Promise<{ folderId: string; workspaceId: string }>;
};

export default async function Page({ params }: Props) {
  const { folderId, workspaceId } = await params;

  const folder = await fetchFolder(folderId, workspaceId);

  if (!folder) {
    return <p>folder not found</p>;
  }
  return (
    <FormWrapper
      title="Folder Setup"
      formTitle="Create New Folder"
      desc="Organize your notes with folders."
    >
      <Suspense fallback={<p>Loading Form</p>}>
        <FolderForm isEditForm={true} oldFolder={folder.data} />
      </Suspense>
    </FormWrapper>
  );
}
