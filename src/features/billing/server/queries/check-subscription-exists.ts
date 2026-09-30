import { db } from "@/db";
import { subscriptionsTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { SubscriptionPlans } from "../../constants/billing.constants";

type IncomingData = {
  workspaceId: string;
  plan: Exclude<SubscriptionPlans, "free">;
};

export async function checkSubscriptionExists(data: IncomingData) {
  const { workspaceId, plan } = data;
  return db.query.subscriptionsTable.findFirst({
    columns: {
      id: true,
    },
    where: and(
      eq(subscriptionsTable.workspaceId, workspaceId),
      eq(subscriptionsTable.plan, plan),
    ),
  });
}
