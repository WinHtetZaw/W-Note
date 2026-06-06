import z from "zod";

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,128}$/;

export const signUpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(128, "Name must be 128 characters or fewer"),
  email: z.email("Enter a valid email address").trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be 128 characters or fewer")
    .regex(passwordRegex, "Password must include letters and numbers"),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;
