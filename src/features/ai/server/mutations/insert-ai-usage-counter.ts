import { aiUsageCountersTable } from "@/db/schema";
import { Transaction } from "@/db/types";
import { sql } from "drizzle-orm";

type IncomingData = {
  tx: Transaction;
  workspaceId: string;
  periodStart: Date;
  limit: number;
};

export const insertAIUsageCounter = async (data: IncomingData) => {
  const { tx, workspaceId, periodStart, limit } = data;
  const [counter] = await tx
    .insert(aiUsageCountersTable)
    .values({
      workspaceId,
      periodStart,
      requestCount: 1,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: [
        aiUsageCountersTable.workspaceId,
        aiUsageCountersTable.periodStart,
      ],

      set: {
        requestCount: sql`${aiUsageCountersTable.requestCount} + 1`,
        updatedAt: new Date(),
      },

      where: sql`
          ${aiUsageCountersTable.requestCount} < ${limit}
        `,
    })
    .returning({
      id: aiUsageCountersTable.id,
      requestCount: aiUsageCountersTable.requestCount,
    });

  return counter;
};
