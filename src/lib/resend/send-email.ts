import { ReactElement } from "react";
import { resend } from "./client";
import { env } from "@/data/env/server";
import { EmailResult } from "./types";

type SendEmailOptions = {
  to: string | string[];
  subject: string;
  react: ReactElement;
};

export async function sendEmail({
  to,
  subject,
  react,
}: SendEmailOptions): Promise<EmailResult> {
  const { data, error } = await resend.emails.send({
    from: env.EMAIL_FROM,
    to,
    subject,
    react,
  });

  if (error) {
    return { success: false, error };
  }

  return { success: true, data };
}
