"use server";

import { requireAuth, requireWorkspaceMember } from "@/lib/permissions";
import { getNote } from "../queries/get-note";

export async function fetchNote(noteId: string) {
  // Validate auth
  await requireAuth();

  // fetching a note
  const note = await getNote(noteId);
  if (!note) {
    return { success: false, message: "Fail to get note" };
  }

  // permission check from db workspaceId
  await requireWorkspaceMember(note.workspaceId);

  return { success: true, data: note };
}
