import { db } from "@/db";
import { subscriptionsTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function getActiveSubscriptionPlan(workspaceId: string) {
  return db.query.subscriptionsTable.findFirst({
    where: and(
      eq(subscriptionsTable.workspaceId, workspaceId),
      eq(subscriptionsTable.status, "active"),
    ),
    columns: {
      plan: true,
    },
  });
}
