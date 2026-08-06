import { Body, Container, Head, Html, Preview } from "@react-email/components";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  preview: string;
}>;

const bodyStyle = {
  backgroundColor: "#f4f4f5",
  margin: 0,
  padding: "40px 0",
  fontFamily: "Inter, Arial, sans-serif",
};

const containerStyle = {
  maxWidth: "600px",
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  padding: "40px",
  margin: "0 auto",
  border: "1px solid #e4e4e7",
};

export function EmailLayout({ preview, children }: Props) {
  return (
    <Html>
      <Head />

      <Preview>{preview}</Preview>

      <Body style={bodyStyle}>
        <Container style={containerStyle}>{children}</Container>
      </Body>
    </Html>
  );
}
