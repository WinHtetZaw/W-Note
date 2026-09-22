import FormWrapper from "@/components/layout/form-wrapper";
import FolderForm from "@/features/folders/components/folder-form";
import { Suspense } from "react";

export default function Page() {
  return (
    <FormWrapper
      title="Folder Setup"
      formTitle="Create New Folder"
      desc="Organize your notes with folders."
    >
      <Suspense fallback={<p>Loading Form</p>}>
        <FolderForm />
      </Suspense>
    </FormWrapper>
  );
}
