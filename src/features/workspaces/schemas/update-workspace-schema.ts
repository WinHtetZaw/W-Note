import { z } from "zod";

export const updateWorkspaceSchema = z.object({
  workspaceId: z.uuid(),
  name: z.string().min(1, "Workspace name is required").max(255),
});

export type UpdateWorkspaceInput = z.infer<typeof updateWorkspaceSchema>;
