import FormWrapper from "@/components/layout/form-wrapper";
import MainLoading from "@/components/ui/main-loaing";
import NoteFormLoader from "@/features/notes/components/note-form-loader";
import { Suspense } from "react";

type Props = {
  params: Promise<{ workspaceId: string; noteId: string }>;
};

export default async function Page({ params }: Props) {
  return (
    <Suspense fallback={<MainLoading />}>
      <NoteEditPageContet params={params} />
    </Suspense>
  );
}

async function NoteEditPageContet({ params }: Props) {
  const { noteId, workspaceId } = await params;

  return (
    <FormWrapper
      title="AI Note Editor"
      desc="Write, organize, and enhance notes with AI."
      formTitle="Edit Note"
      isNoteForm={true}
    >
      <NoteFormLoader noteId={noteId} workspaceId={workspaceId} />
    </FormWrapper>
  );
}
