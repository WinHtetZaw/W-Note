"use server";

import { requireNoteEdit } from "@/lib/permissions";
import { moveToTrash } from "../mutations/move-to-trash";

export async function moveToTrashAction(noteId: string) {
  await requireNoteEdit(noteId);

  const success = await moveToTrash(noteId);
  if (!success) {
    return { success, message: "Fail to move note to trash" };
  }

  return { success, message: "Successfuly note moved to trash" };
}
