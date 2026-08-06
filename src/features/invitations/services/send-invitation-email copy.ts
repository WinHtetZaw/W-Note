type SendInvitationEmailInput = {
  email: string;
  inviterName: string;
  workspaceName: string;
  inviteLink: string;
};

export async function sendInvitationEmail({
  email,
  inviterName,
  workspaceName,
  inviteLink,
}: SendInvitationEmailInput) {
  /**
   * TODO:
   *
   * Resend
   * React Email
   * SendGrid
   * AWS SES
   */

  console.log({
    to: email,
    inviterName,
    workspaceName,
    inviteLink,
  });

  return true;
}
