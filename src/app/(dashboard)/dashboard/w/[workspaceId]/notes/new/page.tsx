import FormWrapper from "@/components/layout/form-wrapper";
import NoteFormPage from "@/features/notes/components/note-form";

type Props = {
  params: Promise<{ workspaceId: string }>;
};

export default async function Page({ params }: Props) {
  // const { workspaceId } = await params;
  return (
    <FormWrapper
      title="AI Note Editor"
      desc="Write, organize, and enhance notes with AI."
      formTitle="Create Note"
      isNoteForm={true}
    >
      <NoteFormPage />
    </FormWrapper>
  );
}
