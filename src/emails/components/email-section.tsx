import { Section } from "@react-email/components";
import { PropsWithChildren } from "react";

const sectionStyle = {
  marginTop: "24px",
};

export function EmailSection({ children }: PropsWithChildren) {
  return <Section style={sectionStyle}>{children}</Section>;
}
