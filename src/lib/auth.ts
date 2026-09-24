import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // your drizzle instance
import { env } from "@/data/env/server";
import { env as clientEnv } from "@/data/env/client";
import { nextCookies } from "better-auth/next-js";
import { sendDeleteAccountEmail } from "@/emails/send-delete-account-email";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false, // disable auto sign-in after sign-up
  },
  user: {
    changeEmail: { enabled: true, updateEmailWithoutVerification: true },
    deleteUser: {
      enabled: true,

      sendDeleteAccountVerification: async ({ user, url }) => {
        await sendDeleteAccountEmail({
          to: user.email,
          userName: user.name,
          deletionLink: url,
          expiresIn: "1 hour",
        });
      },
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      // Send email using your email provider
      // Example:
      //
      // await sendEmail({
      //   to: user.email,
      //   subject: "Verify your new email",
      //   url,
      // });
    },
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
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  trustedOrigins: [
    clientEnv.NEXT_PUBLIC_APP_URL,
    "https://w-note-ai-git-staging-winhtetzaws-projects.vercel.app/",
  ],
});
