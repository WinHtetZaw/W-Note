import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import * as schema from "./schema";
import { env } from "@/data/env/server";

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

export const db = drizzle(pool, {
  schema,
  logger: true,
});

export type Neondb = typeof db;
