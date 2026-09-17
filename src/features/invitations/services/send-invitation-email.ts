import { sendEmail } from "@/lib/resend";

import { InvitationEmail } from "@/emails/templates/invitation-email";

type Props = {
  to: string;
  workspaceName: string;
  inviterName: string;
  role: "admin" | "member";
  invitationLink: string;
  expiresIn: string;
};

export async function sendInvitationEmail({
  to,
  workspaceName,
  inviterName,
  role,
  invitationLink,
  expiresIn,
}: Props) {
  return sendEmail({
    to,
    subject: `You're invited to join ${workspaceName}`,
    react: InvitationEmail({
      workspaceName,
      inviterName,
      role,
      invitationLink,
      expiresIn,
    }),
  });
}
