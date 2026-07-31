import { db } from "@/db";
import { workspaceMembersTable } from "@/db/schema";
import { Transaction } from "@/lib/types";

type CreateWorkspaceMemberData = {
  workspaceId: string;
  userId: string;
  role: "admin" | "member";
};

export async function createWorkspaceMember(
  tx: Transaction,
  data: typeof workspaceMembersTable.$inferInsert,
) {
  const [member] = await tx
    .insert(workspaceMembersTable)
    .values(data)
    .returning();

  return member;
}
