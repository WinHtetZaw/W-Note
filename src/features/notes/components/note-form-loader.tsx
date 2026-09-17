import { Suspense } from "react";
import NoteFormPage from "./note-form";
import { fetchNoteById } from "../server/actions/fetch-note-by-id";

export default async function NoteFormLoader({
  workspaceId,
  noteId,
}: {
  workspaceId: string;
  noteId: string;
}) {
  const res = await fetchNoteById({ workspaceId, noteId });
  if (res.code) {
    return <div>Failed to load note.</div>;
  }

  return (
    <Suspense fallback={<p>Loading Form</p>}>
      <NoteFormPage
        oldNote={{ title: res.data.title, content: res.data.content ?? "" }}
        isEditForm={true}
      />
    </Suspense>
  );
}
