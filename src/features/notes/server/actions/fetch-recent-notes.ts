"use server";

import { requireWorkspaceMember } from "@/lib/permissions";
import { getRecentNotes } from "../queries/get-recent-notes";

export async function fetchRecentNotes(workspaceId: string, limit = 10) {
  await requireWorkspaceMember(workspaceId);
  const notes = await getRecentNotes(workspaceId, limit);
  if (notes.length === 0) {
    return { success: false, message: "Fail to get notes" };
  }
  return { success: true, data: notes };
}
