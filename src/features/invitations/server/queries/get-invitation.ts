import { db } from "@/db";
import { workspaceInvitationsTable } from "@/db/schema";

import { eq } from "drizzle-orm";

export async function getInvitation(token: string) {
  return db.query.workspaceInvitationsTable.findFirst({
    where: eq(workspaceInvitationsTable.token, token),
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
