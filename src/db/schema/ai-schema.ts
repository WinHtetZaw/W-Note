import {
  pgTable,
  uuid,
  text,
  varchar,
  integer,
  index,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user as usersTable } from "./auth-schema";
import { workspacesTable } from "./workspace-schema";
import { createdAt, timeAt, updatedAt } from "./db-schema-helper";
import { AIRequestType, AIProvider } from "@/features/ai/types/ai.types";
import { AIUsageReservationStatus } from "@/features/ai/constants/ai.constants";

/* =========================================================
   AI USAGE
========================================================= */
export const aiUsageTable = pgTable(
  "ai_usage",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "cascade",
      }),
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspacesTable.id, {
        onDelete: "cascade",
      }),
    requestType: varchar("request_type", {
      length: 100,
    })
      .$type<AIRequestType>()
      .notNull(),
    provider: varchar("provider", {
      length: 50,
    })
      .$type<AIProvider>()
      .notNull(),
    model: varchar("model", {
      length: 100,
    }),
    inputTokens: integer("input_tokens").notNull().default(0),
    outputTokens: integer("output_tokens").notNull().default(0),
    costInCents: integer("cost_in_cents"),
    createdAt,
  },
  (table) => [
    index("ai_usage_workspace_created_at_idx").on(
      table.workspaceId,
      table.createdAt,
    ),
    index("ai_usage_user_created_at_idx").on(table.userId, table.createdAt),
  ],
);

export const aiUsageCountersTable = pgTable(
  "ai_usage_counters",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspacesTable.id, {
        onDelete: "cascade",
      }),

    periodStart: timeAt("period_start").notNull(),

    requestCount: integer("request_count").notNull().default(0),

    createdAt,
    updatedAt,
  },
  (table) => [
    uniqueIndex("ai_usage_counters_workspace_period_idx").on(
      table.workspaceId,
      table.periodStart,
    ),
  ],
);

export const aiUsageReservationsTable = pgTable(
  "ai_usage_reservations",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspacesTable.id, {
        onDelete: "cascade",
      }),

    periodStart: timeAt("period_start").notNull(),

    status: varchar("status", { length: 20 })
      .$type<AIUsageReservationStatus>()
      .notNull()
      .default("reserved"),

    expiresAt: timeAt("expires_at").notNull(),
    completedAt: timeAt("completed_at"),
    releasedAt: timeAt("released_at"),

    createdAt,
    updatedAt,
  },
  (table) => [
    index("ai_usage_reservations_workspace_idx").on(table.workspaceId),

    index("ai_usage_reservations_expires_idx").on(table.expiresAt),

    index("ai_usage_reservations_status_expires_idx").on(
      table.status,
      table.expiresAt,
    ),
  ],
);

/* ---------------- AI USAGE ---------------- */
export const aiUsageRelations = relations(aiUsageTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [aiUsageTable.userId],
    references: [usersTable.id],
  }),
  workspace: one(workspacesTable, {
    fields: [aiUsageTable.workspaceId],
    references: [workspacesTable.id],
  }),
}));

export const aiUsageCountersRelations = relations(
  aiUsageCountersTable,
  ({ one }) => ({
    workspace: one(workspacesTable, {
      fields: [aiUsageCountersTable.workspaceId],
      references: [workspacesTable.id],
    }),
  }),
);

export const aiUsageReservationsRelations = relations(
  aiUsageReservationsTable,
  ({ one }) => ({
    workspace: one(workspacesTable, {
      fields: [aiUsageReservationsTable.workspaceId],
      references: [workspacesTable.id],
    }),
  }),
);
