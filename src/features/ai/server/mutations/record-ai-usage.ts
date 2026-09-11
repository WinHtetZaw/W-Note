import { db } from "@/db";
import { aiUsageTable } from "@/db/schema";

export async function recordAIUsage(data: typeof aiUsageTable.$inferInsert) {
  const [aiUsage] = await db.insert(aiUsageTable).values(data).returning();
  return aiUsage;
}
