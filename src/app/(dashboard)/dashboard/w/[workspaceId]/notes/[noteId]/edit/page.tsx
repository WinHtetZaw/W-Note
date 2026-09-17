import FormWrapper from "@/components/layout/form-wrapper";
import NoteFormLoader from "@/features/notes/components/note-form-loader";

type Props = {
  params: Promise<{ workspaceId: string; noteId: string }>;
};

export default async function Page({ params }: Props) {
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
