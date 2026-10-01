import { db } from "@/db";
import { aiUsageCountersTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { getCurrentAiUsagePeriod } from "../../utils/get-current-ai-usage-period";

export async function getAIUsageCounter(workspaceId: string) {
  const periodStart = getCurrentAiUsagePeriod();

  const [counter] = await db
    .select({
      requestCount: aiUsageCountersTable.requestCount,
    })
    .from(aiUsageCountersTable)
    .where(
      and(
        eq(aiUsageCountersTable.workspaceId, workspaceId),
        eq(aiUsageCountersTable.periodStart, periodStart),
      ),
    )
    .limit(1);

  return (
    counter ?? {
      requestCount: 0,
    }
  );
}
