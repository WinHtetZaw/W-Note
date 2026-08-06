import { Heading } from "@react-email/components";

type Props = { children: React.ReactNode };

const headingStyle = {
  fontSize: "28px",
  marginBottom: "24px",
  color: "#18181b",
};

export function EmailHeading({ children }: Props) {
  return <Heading style={headingStyle}>{children}</Heading>;
}
