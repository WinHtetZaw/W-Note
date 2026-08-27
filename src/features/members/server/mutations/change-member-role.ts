import { db } from "@/db";
import { workspaceMembersTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";

type IncomingData = {
  workspaceId: string;
  memberId: string;
  role: "member" | "admin";
};

export const changeMemberRole = async ({
  workspaceId,
  memberId,
  role,
}: IncomingData) => {
  const [updated] = await db
    .update(workspaceMembersTable)
    .set({ role })
    .where(
      and(
        eq(workspaceMembersTable.workspaceId, workspaceId),
        eq(workspaceMembersTable.userId, memberId),
      ),
    )
    .returning({ usreId: workspaceMembersTable.userId });

  return !!updated.usreId;
};
