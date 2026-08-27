import { z } from "zod";

export const createFolderSchema = z.object({
  workspaceId: z.uuid(),
  name: z.string().trim().min(1).max(255),
});

export type CreateFolderInput = z.infer<typeof createFolderSchema>;
