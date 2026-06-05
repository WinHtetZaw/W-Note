"use server";

import {
  requireAuth,
  requireNoteEdit,
  requireWorkspaceMember,
} from "@/lib/permissions";
import { deleteNote } from "../mutations/delete-note";

export async function removeNote(noteId: string) {
  await requireNoteEdit(noteId);

  const success = await deleteNote(noteId);
  if (!success) {
    return { success, message: "Fail to delete note" };
  }

  return { success, message: "Successfuly note deleted" };
}
