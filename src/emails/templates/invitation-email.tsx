import {
  EmailButton,
  EmailDivider,
  EmailFooter,
  EmailHeading,
  EmailLayout,
  EmailSection,
  EmailText,
} from "@/emails/components";

type InvitationEmailProps = {
  workspaceName: string;
  inviterName: string;
  role: "admin" | "member";
  invitationLink: string;
  expiresAt: string;
};

export function InvitationEmail({
  workspaceName,
  inviterName,
  role,
  invitationLink,
  expiresAt,
}: InvitationEmailProps) {
  return (
    <EmailLayout preview={`You've been invited to join ${workspaceName}`}>
      <EmailHeading>You're invited! 🎉</EmailHeading>

      <EmailText>
        <strong>{inviterName}</strong> has invited you to join the workspace{" "}
        <strong>{workspaceName}</strong>.
      </EmailText>

      <EmailSection>
        <table
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          style={{
            border: "1px solid #e4e4e7",
            borderRadius: "12px",
            padding: "24px",
            backgroundColor: "#fafafa",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  paddingBottom: "12px",
                  color: "#71717a",
                  fontSize: "14px",
                }}
              >
                Workspace
              </td>
            </tr>

            <tr>
              <td
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  paddingBottom: "24px",
                }}
              >
                {workspaceName}
              </td>
            </tr>

            <tr>
              <td
                style={{
                  paddingBottom: "12px",
                  color: "#71717a",
                  fontSize: "14px",
                }}
              >
                Invited by
              </td>
            </tr>

            <tr>
              <td
                style={{
                  paddingBottom: "24px",
                  fontWeight: 600,
                }}
              >
                {inviterName}
              </td>
            </tr>

            <tr>
              <td
                style={{
                  paddingBottom: "12px",
                  color: "#71717a",
                  fontSize: "14px",
                }}
              >
                Role
              </td>
            </tr>

            <tr>
              <td
                style={{
                  fontWeight: 600,
                }}
              >
                {role}
              </td>
            </tr>
          </tbody>
        </table>
      </EmailSection>

      <EmailText>
        This invitation expires in <strong>{expiresAt} days</strong>.
      </EmailText>

      <EmailSection>
        <EmailButton href={invitationLink}>Accept Invitation</EmailButton>
      </EmailSection>

      <EmailDivider />

      <EmailText>
        If the button doesn't work, copy and paste this URL into your browser:
      </EmailText>

      <EmailText>{invitationLink}</EmailText>

      <EmailFooter />
    </EmailLayout>
  );
}

export default InvitationEmail;
