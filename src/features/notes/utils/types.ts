import { getNoteById } from "../server/queries/get-note-by-id";

export type Note = Omit<
  NonNullable<Awaited<ReturnType<typeof getNoteById>>>,
  "folder" | "author"
>;

export type NoteView = {
  id: string;
  workspaceId: string;
  title: string;
  updatedAt: Date;
};
