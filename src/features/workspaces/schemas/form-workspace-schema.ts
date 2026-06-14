import z from "zod";

export const workspaceSchema = z.object({
  name: z.string().min(1, "Name must be at lease 1 charactor"),
});

export type WorkspaceFormValues = z.infer<typeof workspaceSchema>;
