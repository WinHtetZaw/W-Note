import { resend, sendEmail } from "@/lib/resend";

import { InvitationEmail } from "@/emails/templates/invitation-email";
import { env } from "@/data/env/server";
import { getInvitationExpiration } from "./get-invitation-expiration";

type Props = {
  to: string;
  workspaceName: string;
  inviterName: string;
  role: "admin" | "member";
  invitationLink: string;
  expiresAt: string;
};

export async function sendInvitationEmail({
  to,
  workspaceName,
  inviterName,
  role,
  invitationLink,
  expiresAt,
}: Props) {
  // const expiresInDays = getInvitationExpiration();
  return sendEmail({
    to,
    subject: `You're invited to join ${workspaceName}`,
    react: InvitationEmail({
      workspaceName,
      inviterName,
      role,
      invitationLink,
      expiresAt,
    }),
  });
}
