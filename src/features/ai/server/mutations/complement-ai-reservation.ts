import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { aiUsageReservationsTable } from "@/db/schema";

export async function completeAiReservation(reservationId: string) {
  const [reservation] = await db
    .update(aiUsageReservationsTable)
    .set({
      status: "completed",
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(aiUsageReservationsTable.id, reservationId),
        eq(aiUsageReservationsTable.status, "reserved"),
      ),
    )
    .returning({
      id: aiUsageReservationsTable.id,
    });

  return Boolean(reservation);
}
