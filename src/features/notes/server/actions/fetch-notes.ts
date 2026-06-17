"use server";

import { requireWorkspaceMember } from "@/lib/permissions";
import { getNotes, Notes } from "../queries/get-notes";
import { fail, ok, Result } from "@/lib/types";

export async function fetchNotes(
  workspaceId: string,
  limit?: number,
): Promise<Result<Notes>> {
  // auth and permission
  await requireWorkspaceMember(workspaceId);

  // fetching notes
  const notes = await getNotes(workspaceId, limit);
  if (!notes) {
    return fail("Fail to get notes");
  }

  return ok(notes);
}
