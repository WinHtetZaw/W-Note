import FormWrapper from "@/components/layout/form-wrapper";
import NoteFormPage from "@/features/notes/components/note-form";
import NoteFormLoader from "@/features/notes/components/note-form-loader";
import { fetchNote } from "@/features/notes/server/actions";
import { Suspense } from "react";

type Props = {
  params: Promise<{ workspaceId: string; noteId: string }>;
};

export default async function Page({ params }: Props) {
  const { noteId } = await params;

  return (
    <FormWrapper
      title="AI Note Editor"
      desc="Write, organize, and enhance notes with AI."
      formTitle="Edit Note"
      isNoteForm={true}
    >
      <NoteFormLoader noteId={noteId} />
    </FormWrapper>
  );
}
