import { index, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt } from "./db-schema-helper";

export const stripeEventsTable = pgTable(
  "stripe_events",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    stripeEventId: text("stripe_event_id").notNull().unique(),

    type: text("type").notNull(),

    createdAt,
  },
  (table) => [index("stripe_events_type_idx").on(table.type)],
);
