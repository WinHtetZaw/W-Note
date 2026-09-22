import {
  pgTable,
  uuid,
  text,
  timestamp,
  varchar,
  index,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { workspacesTable } from "./workspace-schema";
import { createdAt, updatedAt } from "./db-schema-helper";
import {
  SubscriptionPlans,
  SubscriptionStatus,
} from "@/features/billing/types/billing.types";

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
      .$type<SubscriptionPlans>()
      .notNull()
      .default("free"),

    status: varchar("status", {
      length: 50,
    })
      .$type<SubscriptionStatus>()
      .notNull()
      .default("active"),

    currentPeriodEnd: timestamp("current_period_end"),
    cancelAtPeriodEnd: boolean("cancel_at_period_end").notNull().default(false),

    createdAt,
    updatedAt,
  },
  (table) => [
    index("subscriptions_workspace_idx").on(table.workspaceId),
    index("subscriptions_stripe_customer_idx").on(table.stripeCustomerId),
    index("subscriptions_stripe_subscription_idx").on(
      table.stripeSubscriptionId,
    ),
  ],
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
