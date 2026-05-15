import { sql } from "drizzle-orm";
import { db } from ".";

async function reset() {
  await db.execute(sql`
    DROP SCHEMA public CASCADE;
    CREATE SCHEMA public;
  `);

  console.log("Database reset complete");
}

reset().catch(console.error);
