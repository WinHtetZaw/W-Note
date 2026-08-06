import { db } from "@/db";
import { workspaceInvitationsTable } from "@/db/schema";

import { eq } from "drizzle-orm";
import { hashInvitationToken } from "../../services/hash-invitation-token";

export async function getInvitation(token: string) {
  const tokenHash = hashInvitationToken(token);

  return db.query.workspaceInvitationsTable.findFirst({
    where: eq(workspaceInvitationsTable.tokenHash, tokenHash),
    with: {
      workspace: true,
      inviter: {
        columns: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
}
