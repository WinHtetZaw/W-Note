// import { db } from "@/db";
// import { workspaceInvitationsTable } from "@/db/schema";
// import { getInvitationExpiration } from "../../services/get-invitation-expiration";

// type CreateInvitationData = {
//   workspaceId: string;
//   invitedBy: string;
//   email: string;
//   role: "admin" | "member";
//   token: string;
// };

// export async function createInvitation(data: CreateInvitationData) {
//   // const existing = await

//   const { workspaceId, invitedBy, role, email, token } = data;
//   const expiresAt = getInvitationExpiration();
//   const [invitation] = await db
//     .insert(workspaceInvitationsTable)
//     .values({ workspaceId, invitedBy, email, role, token, expiresAt })
//     .returning();

//   return invitation;
// }

// export type Inviation = NonNullable<
//   Awaited<ReturnType<typeof createInvitation>>
// >;

import { db } from "@/db";
import { workspaceInvitationsTable } from "@/db/schema";

type CreateInvitationData = {
  workspaceId: string;
  invitedBy: string;
  email: string | null;
  role: "admin" | "member";
  type: "email" | "link";
  token: string;
  expiresAt: Date;
};

export async function createInvitation(
  data: typeof workspaceInvitationsTable.$inferInsert,
) {
  const [invitation] = await db
    .insert(workspaceInvitationsTable)
    .values(data)
    .returning();

  return invitation;
}
