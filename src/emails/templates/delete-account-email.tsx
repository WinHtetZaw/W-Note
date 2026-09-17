import {
  EmailButton,
  EmailDivider,
  EmailFooter,
  EmailHeading,
  EmailLayout,
  EmailSection,
  EmailText,
} from "@/emails/components";

type DeleteAccountEmailProps = {
  userName: string;
  deletionLink: string;
  expiresIn: string;
};

const warningStyle = {
  border: "1px solid #fecaca",
  borderRadius: "12px",
  padding: "24px",
  backgroundColor: "#fef2f2",
};

const warningTitleStyle = {
  fontSize: "16px",
  fontWeight: 600,
  paddingBottom: "12px",
};

const warningTextStyle = {
  color: "#71717a",
  fontSize: "14px",
  lineHeight: "1.6",
};

export function DeleteAccountEmail({
  userName,
  deletionLink,
  expiresIn,
}: DeleteAccountEmailProps) {
  return (
    <EmailLayout preview="Confirm your account deletion">
      <EmailHeading>Confirm account deletion</EmailHeading>

      <EmailText>
        Hi <strong>{userName}</strong>,
      </EmailText>

      <EmailText>
        We received a request to permanently delete your account.
      </EmailText>

      <EmailSection>
        <table
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          style={warningStyle}
        >
          <tbody>
            <tr>
              <td style={warningTitleStyle}>This action is permanent</td>
            </tr>

            <tr>
              <td style={warningTextStyle}>
                Deleting your account will permanently remove your account and
                associated data. This action cannot be undone.
              </td>
            </tr>
          </tbody>
        </table>
      </EmailSection>

      <EmailText>
        If you requested this deletion, click the button below to confirm. This
        link expires in <strong>{expiresIn}</strong>.
      </EmailText>

      <EmailSection>
        <EmailButton href={deletionLink}>Delete My Account</EmailButton>
      </EmailSection>

      <EmailDivider />

      <EmailText>
        If you didn't request an account deletion, you can safely ignore this
        email. Your account will not be deleted unless you confirm the request.
      </EmailText>

      <EmailText>
        If the button doesn't work, copy and paste this URL into your browser:
      </EmailText>

      <EmailText>{deletionLink}</EmailText>

      <EmailFooter />
    </EmailLayout>
  );
}

export default DeleteAccountEmail;
