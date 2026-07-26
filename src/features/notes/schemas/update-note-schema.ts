import { z } from "zod";

export const updateNoteSchema = z.object({
  noteId: z.uuid(),
  workspaceId: z.uuid(),
  title: z.string().trim().min(1).max(255),
  content: z.string().nullable(),
});

export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;
