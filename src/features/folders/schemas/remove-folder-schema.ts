import z from "zod";

export const removefolderSchema = z.object({
  workspaceId: z.string(),
  folderId: z.string(),
});

export type RemoveFolder = z.infer<typeof removefolderSchema>;
