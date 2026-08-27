"use server";

import { moveNoteToFolder } from "../mutations/move-note-to-folder";
import { requireWorkspaceMember } from "@/lib/permissions";

export async function moveNoteToFolderAction(
  noteId: string,
  folderId: string,
  workspaceId: string,
) {
  await requireWorkspaceMember(workspaceId);
  const note = await moveNoteToFolder({ noteId, folderId });
  if (!note) {
    return { success: false, message: "Fail to move note" };
  }

  return { success: true, message: "Successfully moved note" };
}
