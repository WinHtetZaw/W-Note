"use client";

import { useEffect } from "react";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";

type ErrorPageProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-6">
      {/* Background glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 size-125 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute right-1/4 top-1/2 size-75 rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-lg text-center">
        {/* Icon */}
        <div className="mx-auto mb-8 flex size-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-violet-500/10 backdrop-blur-xl">
          <AlertTriangle className="size-9 text-violet-400" />
        </div>

        {/* Badge */}
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-violet-400">
          Something went wrong
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          We hit a problem
        </h1>

        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-zinc-400">
          We couldn&apos;t load this page right now. Please try again, or head
          back to your dashboard.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 text-sm font-semibold text-white transition hover:bg-violet-400"
          >
            <RefreshCw className="size-4" />
            Try again
          </button>

          <Link
            href="/dashboard"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-medium text-zinc-200 backdrop-blur-xl transition hover:bg-white/10"
          >
            <Home className="size-4" />
            Go to dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
