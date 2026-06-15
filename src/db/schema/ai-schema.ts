import {
  pgTable,
  uuid,
  text,
  varchar,
  integer,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user as usersTable } from "./auth-schema";
import { workspacesTable } from "./workspace-schema";
import { createdAt } from "./db-schema-helper";

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
    }).notNull(),
    model: varchar("model", {
      length: 100,
    }),
    tokensUsed: integer("tokens_used").notNull().default(0),
    costInCents: integer("cost_in_cents"),
    createdAt,
  },
  (table) => [
    index("ai_usage_workspace_idx").on(table.workspaceId),
    index("ai_usage_user_idx").on(table.userId),
    index("ai_usage_created_at_idx").on(table.createdAt),
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
