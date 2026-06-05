import { Suspense } from "react";
import NoteFormPage from "./note-form";
import { fetchNote } from "../server/actions/fetch-note";

export default async function NoteFormLoader({ noteId }: { noteId: string }) {
  const res = await fetchNote(noteId);
  if (!res.success) {
    return <div>Failed to load note.</div>;
  }

  return (
    <Suspense fallback={<p>Loading Form</p>}>
      <NoteFormPage oldNote={res.data} isEditForm={true} />
    </Suspense>
  );
}
