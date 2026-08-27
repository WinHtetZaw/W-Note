import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { checkingFolderExist } from "../../services/checking-folder-exist";

type InsertNote = {
  workspaceId: string;
  authorId: string;
  folderId?: string | null;
};

export async function insertNote(data: InsertNote) {
  const { workspaceId, authorId, folderId } = data;

  if (folderId) {
    const isExisted = await checkingFolderExist({ workspaceId, folderId });
    if (!isExisted) {
      throw new Error("Folder not found");
    }
  }

  const noteData = {
    workspaceId,
    folderId,
    title: "New Note",
    authorId,
    content: "",
  };
  const [note] = await db.insert(notesTable).values(noteData).returning();
  return note;
}
