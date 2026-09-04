"use client";

import Link from "next/link";
import { ArrowLeft, FileQuestion, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-6">
      {/* Background glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 size-125 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute left-1/3 top-1/2 size-75 rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-lg text-center">
        {/* Icon */}
        <div className="mx-auto mb-8 flex size-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-violet-500/10 backdrop-blur-xl">
          <FileQuestion className="size-9 text-violet-400" />
        </div>

        {/* 404 */}
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-violet-400">
          Error 404
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Page not found
        </h1>

        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-zinc-400">
          The page you’re looking for doesn’t exist, has been moved, or may no
          longer be available.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/dashboard"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 text-sm font-semibold text-white transition hover:bg-violet-400"
          >
            <Home className="size-4" />
            Go to dashboard
          </Link>

          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-medium text-zinc-200 backdrop-blur-xl transition hover:bg-white/10"
          >
            <ArrowLeft className="size-4" />
            Go back
          </button>
        </div>
      </div>
    </main>
  );
}
