import { db } from "@/db";
import { subscriptionsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getWorkspaceSubscription(workspaceId: string) {
  return db.query.subscriptionsTable.findFirst({
    where: eq(subscriptionsTable.workspaceId, workspaceId),
  });
}
