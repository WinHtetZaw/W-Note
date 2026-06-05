"use server";

import { requireWorkspaceMember } from "@/lib/permissions";
import { getNotes } from "../queries/get-notes";

export async function fetchNotes(workspaceId: string) {
  // auth and permission
  await requireWorkspaceMember(workspaceId);

  // fetching notes
  const notes = await getNotes(workspaceId);
  if (!notes) {
    return { success: false, message: "Fail to get notes" };
  }

  return { success: true, data: notes };
}
