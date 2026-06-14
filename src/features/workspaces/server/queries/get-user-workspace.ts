import { db } from "@/db";
import { workspaceMembersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserWorkspace(userId: string) {
  // "use cache";
  //todo implement cache

  return db.query.workspaceMembersTable.findFirst({
    where: eq(workspaceMembersTable.userId, userId),
  });
}

export type UserWorkspace = NonNullable<
  Awaited<ReturnType<typeof getUserWorkspace>>
>;
