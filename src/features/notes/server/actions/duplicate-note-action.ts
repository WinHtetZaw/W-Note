"use server";

import { requireWorkspaceMember } from "@/lib/permissions";
import { duplicateNote } from "../mutations/duplicate-note";

export async function duplicateNoteAction(workspaceId: string, noteId: string) {
  await requireWorkspaceMember(workspaceId);
  const result = await duplicateNote(noteId);

  if (!result) {
    return { success: false, message: "Fail to duplicate Note" };
  }

  return { success: true, message: "Successfully duplicate Note" };
}
