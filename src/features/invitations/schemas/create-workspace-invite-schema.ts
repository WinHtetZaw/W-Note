import { z } from "zod";

export const createWorkspaceInviteSchema = z.object({
  workspaceId: z.uuid(),
  email: z.email(),
  role: z.enum(["admin", "member"]),
});

export type CreateWorkspaceInviteInput = z.infer<
  typeof createWorkspaceInviteSchema
>;
