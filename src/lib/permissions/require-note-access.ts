"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { requireWorkspaceMember } from "./require-workspace-member";

export async function requireNoteAccess(noteId: string) {
  const note = await db.query.notesTable.findFirst({
    where: eq(notesTable.id, noteId),
  });

  if (!note) throw new Error("Note not found");

  await requireWorkspaceMember(note.workspaceId);

  return note;
}
