import { sendEmail } from "@/lib/resend";

import { DeleteAccountEmail } from "@/emails/templates/delete-account-email";

type Props = {
  to: string;
  userName: string;
  deletionLink: string;
  expiresIn: string;
};

export async function sendDeleteAccountEmail({
  to,
  userName,
  deletionLink,
  expiresIn,
}: Props) {
  return sendEmail({
    to,
    subject: "Confirm your account deletion",
    react: DeleteAccountEmail({
      userName,
      deletionLink,
      expiresIn,
    }),
  });
}
