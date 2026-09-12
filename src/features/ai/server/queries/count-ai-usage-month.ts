import { and, count, gte, lt, eq } from "drizzle-orm";

import { db } from "@/db";
import { aiUsageTable } from "@/db/schema";

function getMonthRange() {
  const now = new Date();

  const startOfMonth = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1),
  );

  const startOfNextMonth = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1),
  );

  return { startOfMonth, startOfNextMonth };
}

export async function countAIUsageThisMonth(workspaceId: string) {
  const { startOfMonth, startOfNextMonth } = getMonthRange();

  const [result] = await db
    .select({ count: count() })
    .from(aiUsageTable)
    .where(
      and(
        eq(aiUsageTable.workspaceId, workspaceId),
        gte(aiUsageTable.createdAt, startOfMonth),
        lt(aiUsageTable.createdAt, startOfNextMonth),
      ),
    );

  return result.count;
}

// import { db } from "@/db";
// import { aiUsageTable } from "@/db/schema";
// import { eq } from "drizzle-orm";

// export async function countAIUsageThisMonth(workspaceId: string) {
//   return db.$count(aiUsageTable, eq(aiUsageTable.workspaceId, workspaceId));
// }
