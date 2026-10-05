import { and, count, eq, isNull } from "drizzle-orm";

import { db } from "@/db";
import {
  notesTable,
  foldersTable,
  workspaceMembersTable,
  aiUsageCountersTable,
} from "@/db/schema";
import { getWorkspaceEntitlements } from "@/features/billing/services/get-workspace-entitlements";
import { getCurrentAiUsagePeriod } from "@/features/ai/utils/get-current-ai-usage-period";

export async function getWorkspaceUsage(workspaceId: string) {
  const entitlements = await getWorkspaceEntitlements(workspaceId);

  const periodStart = getCurrentAiUsagePeriod();

  const [[notesResult], [foldersResult], [membersResult], [aiResult]] =
    await Promise.all([
      db
        .select({ total: count() })
        .from(notesTable)
        .where(
          and(
            eq(notesTable.workspaceId, workspaceId),
            isNull(notesTable.deletedAt),
          ),
        ),

      db
        .select({ total: count() })
        .from(foldersTable)
        .where(eq(foldersTable.workspaceId, workspaceId)),

      db
        .select({ total: count() })
        .from(workspaceMembersTable)
        .where(eq(workspaceMembersTable.workspaceId, workspaceId)),

      db
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
        .limit(1),
    ]);

  return {
    plan: entitlements.plan,

    ai: {
      used: aiResult?.requestCount ?? 0,
      limit: entitlements.limits.ai.requestsPerMonth,
    },

    notes: {
      used: notesResult.total,
      limit: entitlements.limits.notes,
    },

    folders: {
      used: foldersResult.total,
      limit: entitlements.limits.folders,
    },

    members: {
      used: membersResult.total,
      limit: entitlements.limits.members,
    },
  };
}
