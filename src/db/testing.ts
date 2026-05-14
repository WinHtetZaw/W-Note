import { db } from ".";
import { testingTable } from "./schema";

// import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// export const testingTable = pgTable("testing", {
//     id: uuid("id").primaryKey().defaultRandom(),
//     text : text("text").notNull(),
//     createdAt: timestamp("created_at").notNull().defaultNow(),
// })

async function main() {
  const user: typeof testingTable.$inferInsert = {
    text: 'Hello, World!',
  };
  await db.insert(testingTable).values(user);
  console.log('New user created!')
  const users = await db.select().from(testingTable);
  console.log('Getting all users from the database: ', users)
}
main();