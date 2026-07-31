import z from "zod";

export const sendInvitationSchema = z.object({
  email: z.email("Enter a valid email address").trim(),
  role: z.enum(["admin", "member"], "Role must be either 'admin' or 'member'"),
});

export type InvitationFormValues = z.infer<typeof sendInvitationSchema>;
