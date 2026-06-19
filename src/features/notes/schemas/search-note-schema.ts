import z from "zod";

export const searchNoteSchema = z.object({
  query: z.string().trim().min(1, "Enter at least 1 character"),
});
