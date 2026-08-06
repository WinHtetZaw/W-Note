import { Text } from "@react-email/components";

const footerTextStyle = {
  marginTop: "40px",
  fontSize: "13px",
  color: "#71717a",
  lineHeight: "22px",
};

export function EmailFooter() {
  return (
    <Text style={footerTextStyle}>
      This email was sent automatically by AI Notes.
      <br />
      If you weren't expecting this email, you can safely ignore it.
    </Text>
  );
}
