import { db } from "@/db";
import { workspaceInvitationsTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";

type IncomingData = {
  workspaceId: string;
  invitationId: string;
};

export async function getInvitationById(data: IncomingData) {
  const { workspaceId, invitationId } = data;
  return db.query.workspaceInvitationsTable.findFirst({
    where: and(
      eq(workspaceInvitationsTable.workspaceId, workspaceId),
      eq(workspaceInvitationsTable.id, invitationId),
    ),
  });
}
