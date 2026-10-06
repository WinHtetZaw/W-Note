import { rateLimiters } from "./limiters";

export type RateLimiterName = keyof typeof rateLimiters;

export type RateLimitIdentifier =
  `user:${string}` | `workspace:${string}` | `ip:${string}`;
