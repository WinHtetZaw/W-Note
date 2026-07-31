import { env } from "@/data/env/client";

type GenerateInviteLinkInput = {
  token: string;
};

export function generateInviteLink({ token }: GenerateInviteLinkInput) {
  const baseUrl = env.NEXT_PUBLIC_APP_URL;
  if (!baseUrl) throw new Error("NEXT_PUBLIC_APP_URL is missing");
  return `${baseUrl}/invite/${token}`;
}
