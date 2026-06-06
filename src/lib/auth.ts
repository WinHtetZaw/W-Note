import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // your drizzle instance
// import * as schema from "@/db/schema"; // your drizzle schema, ensure it includes the auth tables
import { env } from "@/data/env/server";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false, // disable auto sign-in after sign-up
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, //  5 min
    },
  },
  plugins: [nextCookies()],
  experimental: { joins: true },
  // schema: {
  //   ...schema,
  //   user: schema.user,
  // },
  //   socialProviders: {
  //     github: {
  //       clientId: process.env.GITHUB_CLIENT_ID as string,
  //       clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
  //     },
  //   },
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
});
