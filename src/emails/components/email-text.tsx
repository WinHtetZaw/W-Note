import { Text } from "@react-email/components";

type Props = { children: React.ReactNode };

const textStyle = {
  fontSize: "16px",
  lineHeight: "28px",
  color: "#52525b",
};

export function EmailText({ children }: Props) {
  return <Text style={textStyle}>{children}</Text>;
}
