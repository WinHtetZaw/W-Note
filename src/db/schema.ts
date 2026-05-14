import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const testingTable = pgTable("testing", {
    id: uuid("id").primaryKey().defaultRandom(),
    text : text("text").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
})