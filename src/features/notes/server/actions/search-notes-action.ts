import { requireWorkspaceMember } from "@/lib/permissions";
import { fail, ok, Result } from "@/lib/types";
import { searchNoteSchema } from "../../schemas/search-note-schema";
import { SearchNotes, searchNotes } from "../queries/search-notes";
import z from "zod";

export async function searchNotesAction(
  workspaceId: string,
  query: string,
): Promise<Result<SearchNotes>> {
  await requireWorkspaceMember(workspaceId);

  const { success, data } = searchNoteSchema.safeParse({ query });

  // const { success, data } = z.string().trim().min(1).safeParse(query);

  if (!success) {
    return fail("Enter at least 1 character");
  }

  const notes = await searchNotes(workspaceId, data.query);
  if (!notes) {
    return fail("No notes found");
  }

  return ok(notes);
}
