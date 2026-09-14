import z from "zod";

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,128}$/;

export const passwordFormSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be 128 characters or fewer")
    .regex(passwordRegex, "Password must include letters and numbers"),
});

export type PasswordFormValues = z.infer<typeof passwordFormSchema>;
