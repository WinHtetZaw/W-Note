import { db } from "@/db";
import { aiUsageCountersTable, aiUsageReservationsTable } from "@/db/schema";
import { and, eq, lte, sql } from "drizzle-orm";

export async function releaseExpiredAiRequests() {
  const now = new Date();

  return db.transaction(async (tx) => {
    const expiredReservations = await tx
      .update(aiUsageReservationsTable)

      .set({
        status: "released",
        releasedAt: now,
        updatedAt: now,
      })

      .where(
        and(
          eq(aiUsageReservationsTable.status, "reserved"),
          lte(aiUsageReservationsTable.expiresAt, now),
        ),
      )

      .returning({
        workspaceId: aiUsageReservationsTable.workspaceId,
        periodStart: aiUsageReservationsTable.periodStart,
      });

    if (expiredReservations.length === 0) {
      return {
        released: 0,
      };
    }

    for (const reservation of expiredReservations) {
      await tx
        .update(aiUsageCountersTable)

        .set({
          requestCount: sql` GREATEST(${aiUsageCountersTable.requestCount} - 1, 0) `,
          updatedAt: now,
        })

        .where(
          and(
            eq(aiUsageCountersTable.workspaceId, reservation.workspaceId),
            eq(aiUsageCountersTable.periodStart, reservation.periodStart),
          ),
        );
    }

    return {
      released: expiredReservations.length,
    };
  });
}
