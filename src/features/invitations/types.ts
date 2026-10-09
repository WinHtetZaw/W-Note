import { workspaceInvitationsTable } from "@/db/schema";
import { createInvitation } from "./server/mutations/create-invitation";
import { INVITATION_STATUSES } from "./constants";
import { getUserPendingInvitations } from "./server/queries/get-user-pending-invitations";

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

export type InvitationStatus = (typeof INVITATION_STATUSES)[number];

export type Invitation = NonNullable<
  Awaited<ReturnType<typeof createInvitation>>
>;

export type PendingInvitation = NonNullable<
  Awaited<ReturnType<typeof getUserPendingInvitations>>
>[number];

export type InvitationWithInviteLink = Invitation & { inviteLink: string };
