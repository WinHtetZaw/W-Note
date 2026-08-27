import { db } from "@/db";
import { workspaceMembersTable } from "@/db/schema";
import { cacheTags } from "@/lib/cache/tags";
import { eq } from "drizzle-orm";
import { cacheTag } from "next/cache";

export async function getUserWorkspace(userId: string) {
  return db.query.workspaceMembersTable.findFirst({
    where: eq(workspaceMembersTable.userId, userId),
  });
}
