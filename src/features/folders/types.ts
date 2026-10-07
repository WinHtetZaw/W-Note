import { getFoldersWithNotes } from "./server/queries/get-folders-with-notes";

export type FolderNotesView = NonNullable<
  Awaited<ReturnType<typeof getFoldersWithNotes>>
>[number];
