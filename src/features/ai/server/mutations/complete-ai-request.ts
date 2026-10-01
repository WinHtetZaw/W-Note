import { db } from "@/db";
import { aiUsageReservationsTable, aiUsageTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { AIProvider, AIRequestType } from "../../types/ai.types";

type CompleteAiRequestInput = {
  reservationId: string;

  workspaceId: string;
  userId: string;

  requestType: AIRequestType;
  provider: AIProvider;
  model: string;

  inputTokens: number;
  outputTokens: number;
  costInCents: number;
};

export async function completeAiRequest(input: CompleteAiRequestInput) {
  const now = new Date();

  return db.transaction(async (tx) => {
    const [reservation] = await tx
      .update(aiUsageReservationsTable)
      .set({
        status: "completed",
        completedAt: now,
        updatedAt: now,
      })
      .where(
        and(
          eq(aiUsageReservationsTable.id, input.reservationId),
          eq(aiUsageReservationsTable.status, "reserved"),
        ),
      )
      .returning({
        id: aiUsageReservationsTable.id,
      });

    // Reservation was already completed.
    if (!reservation) {
      const existing = await tx.query.aiUsageReservationsTable.findFirst({
        where: eq(aiUsageReservationsTable.id, input.reservationId),
        columns: {
          status: true,
        },
      });

      if (existing?.status === "completed") {
        return {
          completed: true as const,
          alreadyCompleted: true as const,
        };
      }

      return {
        completed: false as const,
        alreadyCompleted: false as const,
      };
    }

    await tx.insert(aiUsageTable).values({
      workspaceId: input.workspaceId,
      userId: input.userId,

      requestType: input.requestType,
      provider: input.provider,
      model: input.model,

      inputTokens: input.inputTokens,
      outputTokens: input.outputTokens,
      costInCents: input.costInCents,

      createdAt: new Date(),
    });

    return {
      completed: true as const,
      alreadyCompleted: false as const,
    };
  });
}

type CompleteResult =
  | {
      completed: true;
      alreadyCompleted: false;
    }
  | {
      completed: true;
      alreadyCompleted: true;
    }
  | {
      completed: false;
      alreadyCompleted: false;
    };
