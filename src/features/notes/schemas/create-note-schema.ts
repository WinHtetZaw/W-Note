import { z } from "zod";

export const createNoteSchema = z.object({
  workspaceId: z.uuid(),
  folderId: z.uuid().nullish(),
  // title: z.string().trim().min(1).max(255),
  // content: z.string().nullable(),
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
