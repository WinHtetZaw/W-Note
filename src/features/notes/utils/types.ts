import { getNote } from "../server/queries/get-note-by-id";

export type Note = Omit<
  NonNullable<Awaited<ReturnType<typeof getNote>>>,
  "folder" | "author"
>;
