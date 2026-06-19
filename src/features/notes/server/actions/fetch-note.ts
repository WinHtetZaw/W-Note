"use server";

import { requireAuth, requireWorkspaceMember } from "@/lib/permissions";
import { getNote, Note } from "../queries/get-note";
import { fail, ok, Result } from "@/lib/types";

export async function fetchNote(
  noteId: string,
  workspaceId: string,
): Promise<Result<Note>> {
  // Validate auth
  await requireWorkspaceMember(workspaceId);

  // fetching a note
  const note = await getNote(noteId);
  if (!note) {
    return fail("Fail to get note");
  }

  // permission check from db workspaceId
  await requireWorkspaceMember(note.workspaceId);

  return ok(note);
}
