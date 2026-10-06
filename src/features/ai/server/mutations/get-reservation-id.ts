import { aiUsageReservationsTable } from "@/db/schema";
import { Transaction } from "@/db/types";

type IncomingData = {
  tx: Transaction;
  workspaceId: string;
  periodStart: Date;
};

const RESERVATION_TTL_MS = 10 * 60 * 1000;

export const getReservationId = async (data: IncomingData) => {
  const now = new Date();

  const { tx, workspaceId, periodStart } = data;

  const [reservation] = await tx

    .insert(aiUsageReservationsTable)

    .values({
      workspaceId,
      periodStart,
      status: "reserved",
      expiresAt: new Date(now.getTime() + RESERVATION_TTL_MS),
      createdAt: now,
      updatedAt: now,
    })

    .returning({ id: aiUsageReservationsTable.id });

  return reservation;
};
