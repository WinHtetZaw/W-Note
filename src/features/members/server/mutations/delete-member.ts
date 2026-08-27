import { db } from "@/db";
import { workspaceMembersTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";

type IncomingData = {
  workspaceId: string;
  memberId: string;
};

export async function deletemember(data: IncomingData) {
  const { workspaceId, memberId } = data;
  const [deletedId] = await db
    .delete(workspaceMembersTable)
    .where(
      and(
        eq(workspaceMembersTable.workspaceId, workspaceId),
        eq(workspaceMembersTable.userId, memberId),
      ),
    )
    .returning({ id: workspaceMembersTable.workspaceId });

  return !!deletedId;
}
