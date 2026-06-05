"use server";

import { removeNoteFromFolder } from "../mutations/remove-note-from-folder";

export async function removeNoteFromFolderAction(noteId: string) {
  const result = await removeNoteFromFolder(noteId);
  if (!result) {
    return { success: false, message: "Fail to remove note from folder" };
  }

  return { success: true, message: "Successfully removed note form folder" };
}
