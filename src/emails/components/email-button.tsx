import { Button } from "@react-email/components";

type Props = {
  href: string;
  children: React.ReactNode;
};

const buttonStyle = {
  display: "inline-block",
  backgroundColor: "#7c3aed",
  color: "#ffffff",
  padding: "14px 28px",
  borderRadius: "12px",
  fontWeight: 600,
  textDecoration: "none",
  marginTop: "24px",
};

export function EmailButton({ href, children }: Props) {
  return (
    <Button href={href} style={buttonStyle}>
      {children}
    </Button>
  );
}
