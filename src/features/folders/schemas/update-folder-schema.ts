import { z } from "zod";

export const updateFolderSchema = z.object({
  folderId: z.uuid(),
  workspaceId: z.uuid(),
  name: z.string().trim().min(1).max(255),
});

export type UpdateFolderInput = z.infer<typeof updateFolderSchema>;
