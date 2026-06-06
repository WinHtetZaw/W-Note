import SignOutButton from "@/features/auth/components/sign-out-button";
import { auth } from "@/lib/auth";
import { Brain } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";

export default async function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Brain className="h-7 w-7 text-violet-400" />
          <span className="text-xl font-bold tracking-tight">NoteAI</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/features"
            className="text-zinc-300 transition hover:text-white"
          >
            Features
          </Link>

          <Link
            href="/pricing"
            className="text-zinc-300 transition hover:text-white"
          >
            Pricing
          </Link>
          <Suspense
            fallback={
              <div className="h-5 w-20 animate-pulse rounded bg-zinc-700" />
            }
          >
            <AuthCheckLink />
          </Suspense>

          <Link
            href="/sign-up"
            className="rounded-full bg-violet-600 px-5 py-2 font-medium transition hover:bg-violet-500"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}

async function AuthCheckLink() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <>
      {session?.user ? (
        <SignOutButton className="text-zinc-300 transition hover:text-white" />
      ) : (
        <Link
          href="/sign-in"
          className="text-zinc-300 transition hover:text-white"
        >
          Sign In
        </Link>
      )}
    </>
  );
}
