import {
  pgTable,
  uuid,
  text,
  timestamp,
  varchar,
  integer,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user as usersTable } from "./auth-schema";
import {
  workspaceInvitationsTable,
  workspaceMembersTable,
  workspacesTable,
} from "./workspace-schema";
import { notesTable, noteVersionsTable } from "./note-schema";

export const createdAt = timestamp("created_at", { withTimezone: true })
  .defaultNow()
  .notNull();

export const updatedAt = timestamp("updated_at", { withTimezone: true })
  .defaultNow()
  .$onUpdate(() => new Date())
  .notNull();

/* =========================================================
   SUBSCRIPTIONS
========================================================= */

export const subscriptionsTable = pgTable("subscriptions", {
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
});

/* =========================================================
   AI USAGE
========================================================= */

export const aiUsageTable = pgTable("ai_usage", {
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
    .$type<"summarize" | "grammar_fix" | "generate_title">()
    .notNull(),
  tokensUsed: integer("tokens_used").notNull().default(0),
  createdAt,
});

/* =========================================================
   RELATIONS
========================================================= */

/* ---------------- USERS ---------------- */

export const usersRelations = relations(usersTable, ({ many }) => ({
  workspaces: many(workspaceMembersTable),
  notes: many(notesTable),
  aiUsage: many(aiUsageTable),
  editedNoteVersions: many(noteVersionsTable),
  sentInvitations: many(workspaceInvitationsTable),
}));

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
