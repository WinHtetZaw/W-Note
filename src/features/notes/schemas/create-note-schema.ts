import { z } from "zod";

export const createNoteSchema = z.object({
  workspaceId: z.uuid(),
  title: z.string().trim().min(1).max(255),
  content: z.string().trim().min(2),
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
