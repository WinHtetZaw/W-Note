import {
  pgTable,
  uuid,
  text,
  timestamp,
  varchar,
  primaryKey,
  integer,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/* =========================================================
   USERS
========================================================= */

export const usersTable = pgTable("users", {
  id: text("id").primaryKey(), // clerk user id
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

/* =========================================================
   WORKSPACES
========================================================= */

export const workspacesTable = pgTable("workspaces", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  ownerId: text("owner_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

/* =========================================================
   WORKSPACE MEMBERS
========================================================= */

export const workspaceMembersTable = pgTable(
  "workspace_members",
  {
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspacesTable.id, {
        onDelete: "cascade",
      }),
    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "cascade",
      }),
    role: varchar("role", {
      length: 50,
    })
      .$type<"owner" | "admin" | "member">()
      .notNull()
      .default("member"),
    joinedAt: timestamp("joined_at").defaultNow().notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.workspaceId, table.userId],
      name: "workspace_members_pk",
    }),
  ],
);

/* =========================================================
   FOLDERS
========================================================= */

export const foldersTable = pgTable("folders", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspacesTable.id, {
      onDelete: "cascade",
    }),
  name: varchar("name", {
    length: 255,
  }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

/* =========================================================
   NOTES
========================================================= */

export const notesTable = pgTable("notes", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspacesTable.id, {
      onDelete: "cascade",
    }),
  folderId: uuid("folder_id").references(() => foldersTable.id, {
    onDelete: "set null",
  }),
  authorId: text("author_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    }),
  title: varchar("title", {
    length: 255,
  }).notNull(),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

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
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
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
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* =========================================================
   RELATIONS
========================================================= */

/* ---------------- USERS ---------------- */

export const usersRelations = relations(usersTable, ({ many }) => ({
  workspaces: many(workspaceMembersTable),
  notes: many(notesTable),
  aiUsage: many(aiUsageTable),
}));

/* ---------------- WORKSPACES ---------------- */

export const workspacesRelations = relations(
  workspacesTable,
  ({ one, many }) => ({
    owner: one(usersTable, {
      fields: [workspacesTable.ownerId],
      references: [usersTable.id],
    }),
    members: many(workspaceMembersTable),
    folders: many(foldersTable),
    notes: many(notesTable),
    subscription: one(subscriptionsTable),
    aiUsage: many(aiUsageTable),
  }),
);

/* ---------------- WORKSPACE MEMBERS ---------------- */

export const workspaceMembersRelations = relations(
  workspaceMembersTable,
  ({ one }) => ({
    workspace: one(workspacesTable, {
      fields: [workspaceMembersTable.workspaceId],
      references: [workspacesTable.id],
    }),
    user: one(usersTable, {
      fields: [workspaceMembersTable.userId],
      references: [usersTable.id],
    }),
  }),
);

/* ---------------- FOLDERS ---------------- */

export const foldersRelations = relations(foldersTable, ({ one, many }) => ({
  workspace: one(workspacesTable, {
    fields: [foldersTable.workspaceId],
    references: [workspacesTable.id],
  }),
  notes: many(notesTable),
}));

/* ---------------- NOTES ---------------- */

export const notesRelations = relations(notesTable, ({ one }) => ({
  workspace: one(workspacesTable, {
    fields: [notesTable.workspaceId],
    references: [workspacesTable.id],
  }),
  folder: one(foldersTable, {
    fields: [notesTable.folderId],
    references: [foldersTable.id],
  }),
  author: one(usersTable, {
    fields: [notesTable.authorId],
    references: [usersTable.id],
  }),
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
