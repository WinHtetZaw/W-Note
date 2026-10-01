import { db } from "@/db";
import { getCurrentAiUsagePeriod } from "../../utils/get-current-ai-usage-period";
import { insertAIUsageCounter } from "./insert-ai-usage-counter";
import { getReservationId } from "./get-reservation-id";

export async function reserveAiRequest(workspaceId: string, limit: number) {
  if (limit <= 0) {
    return {
      allowed: false as const,
      periodStart: getCurrentAiUsagePeriod(),
    };
  }

  const periodStart = getCurrentAiUsagePeriod();

  return db.transaction(async (tx) => {
    const counter = await insertAIUsageCounter({
      tx,
      workspaceId,
      periodStart,
      limit,
    });

    if (!counter) {
      return {
        allowed: false as const,
        periodStart,
      };
    }

    const reservation = await getReservationId({
      tx,
      workspaceId,
      periodStart,
    });

    return {
      allowed: true as const,
      reservationId: reservation.id,
      periodStart,
      requestCount: counter.requestCount,
      remaining: Math.max(limit - counter.requestCount, 0),
      limit,
    };
  });
}
