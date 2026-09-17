import { getNoteById } from "../server/queries/get-note-by-id";

export type Note = Omit<
  NonNullable<Awaited<ReturnType<typeof getNoteById>>>,
  "folder" | "author"
>;
