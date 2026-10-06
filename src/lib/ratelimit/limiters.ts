import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";

export const rateLimiters = {
  general: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(60, "1 m"),
    prefix: "rl:general",
  }),

  mutation: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(60, "1 m"),
    prefix: "rl:mutation",
  }),

  create: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(30, "1 m"),
    prefix: "rl:create",
  }),

  destructive: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(20, "1 m"),
    prefix: "rl:destructive",
  }),

  ai: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "1 m"),
    prefix: "rl:ai",
  }),

  auth: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "10 s"),
    prefix: "rl:auth",
  }),

  invitation: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "1 h"),
    prefix: "rl:invitation",
  }),
} satisfies Record<string, Ratelimit>;
