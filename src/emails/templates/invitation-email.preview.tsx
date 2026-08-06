import { InvitationEmail } from "./invitation-email";

export default function Preview() {
  return (
    <InvitationEmail
      workspaceName="AI Notes Team"
      inviterName="Alex Johnson"
      role="member"
      //   expiresInDays={7}
      expiresAt="2/2/2027"
      invitationLink="https://localhost:3000/invitations/demo-token"
    />
  );
}
