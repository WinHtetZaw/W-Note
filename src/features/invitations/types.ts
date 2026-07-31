import { workspaceInvitationsTable } from "@/db/schema";
import { createInvitation } from "./server/mutations/create-invitation";

// export type Invitation = Pick<
//   typeof workspaceInvitationsTable.$inferSelect,
//   | "id"
//   | "workspaceId"
//   | "email"
//   | "role"
//   | "invitedBy"
//   | "status"
//   //   | "type"
//   //   | "acceptedAt"
//   //   | "revokedAt"
//   | "expiresAt"
// >;

export type Invitation = NonNullable<
  Awaited<ReturnType<typeof createInvitation>>
>;

export type InvitationWithInviteLink = Invitation & { inviteLink: string };
