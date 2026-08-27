import { getNote } from "../server/queries/get-note";

export type Note = Omit<
  NonNullable<Awaited<ReturnType<typeof getNote>>>,
  "folder" | "author"
>;
