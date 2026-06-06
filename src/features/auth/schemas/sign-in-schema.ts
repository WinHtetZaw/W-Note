import z from "zod";

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,128}$/;

export const signInSchema = z.object({
  email: z.email("Enter a valid email address").trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be 128 characters or fewer")
    .regex(passwordRegex, "Password must include letters and numbers"),
});

export type SignInFormValues = z.infer<typeof signInSchema>;
