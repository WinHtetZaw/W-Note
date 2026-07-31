import { db } from "@/db";
import { workspaceMembersTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function getWorkspaceMember(workspaceId: string, userId: string) {
  return db.query.workspaceMembersTable.findFirst({
    where: and(
      eq(workspaceMembersTable.workspaceId, workspaceId),
      eq(workspaceMembersTable.userId, userId),
    ),
    with: {
      user: {
        columns: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
    orderBy: (table, { asc }) => [asc(table.joinedAt)],
  });
}

export type WorkspaceMember = NonNullable<
  Awaited<ReturnType<typeof getWorkspaceMember>>
>;
