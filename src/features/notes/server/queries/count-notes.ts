import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function countNotes(workspaceId: string) {
  return db.$count(notesTable, eq(notesTable.workspaceId, workspaceId));
}
