import { db } from ".";

export type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0];

export type Neondb = typeof db;
