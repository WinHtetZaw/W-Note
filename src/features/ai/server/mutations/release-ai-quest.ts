import { and, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { aiUsageCountersTable, aiUsageReservationsTable } from "@/db/schema";

export async function releaseAiRequest(reservationId: string) {
  const now = new Date();

  return db.transaction(async (tx) => {
    const [reservation] = await tx
      .update(aiUsageReservationsTable)

      .set({
        status: "released",
        releasedAt: now,
        updatedAt: now,
      })

      .where(
        and(
          eq(aiUsageReservationsTable.id, reservationId),
          eq(aiUsageReservationsTable.status, "reserved"),
        ),
      )

      .returning({
        workspaceId: aiUsageReservationsTable.workspaceId,
        periodStart: aiUsageReservationsTable.periodStart,
      });

    if (!reservation) {
      return false;
    }

    await tx
      .update(aiUsageCountersTable)

      .set({
        requestCount: sql`GREATEST(${aiUsageCountersTable.requestCount} - 1, 0 )`,
        updatedAt: new Date(),
      })

      .where(
        and(
          eq(aiUsageCountersTable.workspaceId, reservation.workspaceId),
          eq(aiUsageCountersTable.periodStart, reservation.periodStart),
        ),
      );

    return true;
  });
}
