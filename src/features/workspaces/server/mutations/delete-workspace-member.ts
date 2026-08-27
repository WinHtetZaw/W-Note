import { db } from "@/db";
import { workspaceMembersTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";

type IncomingData = {
  workspaceId: string;
  userId: string;
};

export async function deleteWorkspaceMember(data: IncomingData) {
  const { workspaceId, userId } = data;

  const [deletedId] = await db
    .delete(workspaceMembersTable)
    .where(
      and(
        eq(workspaceMembersTable.workspaceId, workspaceId),
        eq(workspaceMembersTable.userId, userId),
      ),
    )
    .returning({ id: workspaceMembersTable.workspaceId });

  return !!deletedId;
}
