import MainLoading from "@/components/ui/main-loaing";
import NoteEditor from "@/features/notes/components/editor/note-editor";
import { fetchNoteById } from "@/features/notes/server/actions/fetch-note-by-id";
import { Suspense } from "react";

type Props = {
  params: Promise<{
    workspaceId: string;
    noteId: string;
  }>;
};

export default async function NoteDetailPage({ params }: Props) {
  return (
    <Suspense fallback={<MainLoading />}>
      <NoteDetailPageContent params={params} />
    </Suspense>
  );
}

async function NoteDetailPageContent({ params }: Props) {
  const { workspaceId, noteId } = await params;
  const result = await fetchNoteById({ workspaceId, noteId });

  if (result.code) {
    throw new Error("Failed to feth note.");
  }

  const { title, content } = result.data;

  return (
    <>
      <NoteEditor
        title={title}
        noteId={noteId}
        workspaceId={workspaceId}
        content={
          content ?? ""
          // result.data.content ?? {
          //   type: "doc",
          //   content: [],
          // }
        }
      />
    </>
  );
}
