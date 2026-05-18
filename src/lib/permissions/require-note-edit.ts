import { requireNoteAccess } from "./require-note-access";

export async function requireNoteEdit(noteId: string) {
  const note = await requireNoteAccess(noteId);

  return note;
}
