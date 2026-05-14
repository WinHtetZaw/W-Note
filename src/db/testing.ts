import { db } from ".";
import { testingTable } from "./schema";

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