import z from "zod";

export const formSchema = z.object({
  title: z.string().trim().min(2, "Note name must be at least 2 characters"),
  // content: z.string().trim().min(2, "Note name must be at least 2 characters"),
  content: z.string().trim().min(2),
});

export type NoteFormValues = z.infer<typeof formSchema>;
