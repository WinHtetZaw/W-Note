import FormWrapper from "@/components/layout/form-wrapper";
import MainLoading from "@/components/ui/main-loaing";
import NoteFormPage from "@/features/notes/components/note-form";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<MainLoading />}>
      <FormWrapper
        title="AI Note Editor"
        desc="Write, organize, and enhance notes with AI."
        formTitle="Create Note"
        isNoteForm={true}
      >
        <NoteFormPage />
      </FormWrapper>
    </Suspense>
  );
}
