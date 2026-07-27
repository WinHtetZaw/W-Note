"use server";

import { requireAuth } from "@/lib/permissions";
import { deleteNote } from "../mutations/delete-note";
import { requirePermission } from "@/lib/authz";
import { fail, ok, Result } from "@/lib/types";

export async function removeNote(
  noteId: string,
  workspaceId: string,
): Promise<Result<string>> {
  // Auth
  await requireAuth();

  // Authz
  await requirePermission(workspaceId, "note:delete");

  // DB Action
  const success = await deleteNote(noteId);

  // Response
  if (!success) return fail("Fail to delet note");
  return ok("Successfully note deleted");
}
