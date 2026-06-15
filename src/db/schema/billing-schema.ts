import {
  pgTable,
  uuid,
  text,
  timestamp,
  varchar,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { workspacesTable } from "./workspace-schema";
import { createdAt, updatedAt } from "./db-schema-helper";

/* =========================================================
   SUBSCRIPTIONS
========================================================= */
export const subscriptionsTable = pgTable(
  "subscriptions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
      .notNull()
      .unique()
      .references(() => workspacesTable.id, {
        onDelete: "cascade",
      }),
    stripeCustomerId: text("stripe_customer_id"),
    stripeSubscriptionId: text("stripe_subscription_id"),
    plan: varchar("plan", {
      length: 50,
    })
      .$type<"free" | "pro" | "team">()
      .notNull()
      .default("free"),
    status: varchar("status", {
      length: 50,
    })
      .$type<"active" | "canceled" | "past_due">()
      .notNull()
      .default("active"),
    currentPeriodEnd: timestamp("current_period_end"),
    createdAt,
    updatedAt,
  },
  (table) => [index("subscriptions_workspace_idx").on(table.workspaceId)],
);

/* ---------------- SUBSCRIPTIONS ---------------- */
export const subscriptionsRelations = relations(
  subscriptionsTable,
  ({ one }) => ({
    workspace: one(workspacesTable, {
      fields: [subscriptionsTable.workspaceId],
      references: [workspacesTable.id],
    }),
  }),
);
