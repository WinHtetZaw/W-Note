// app/(marketing)/page.tsx

import Link from "next/link";
import { Brain, Sparkles, FileText, Users, Zap, Check } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-transparent text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-600/30 blur-[140px]" />
      </div>

      {/* Header */}
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

            <Link
              href="/sign-in"
              className="text-zinc-300 transition hover:text-white"
            >
              Sign In
            </Link>

            <Link
              href="/sign-up"
              className="rounded-full bg-violet-600 px-5 py-2 font-medium transition hover:bg-violet-500"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-28 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-violet-400" />
            AI-Powered Smart Notes
          </div>

          <h1 className="max-w-5xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
            Your Second Brain
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              {" "}
              Powered by AI
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-400 md:text-xl">
            Capture ideas, organize knowledge, summarize notes, and collaborate
            with your team using powerful AI tools.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/sign-up"
              className="rounded-2xl bg-violet-600 px-8 py-4 text-lg font-semibold transition hover:bg-violet-500"
            >
              Start Free
            </Link>

            <Link
              href="/features"
              className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-lg font-semibold backdrop-blur-xl transition hover:bg-white/10"
            >
              Explore Features
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">
            Built for modern productivity
          </h2>

          <p className="mt-5 text-lg text-zinc-400">
            Everything you need for AI-powered note taking.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <FeatureCard
            icon={<FileText className="h-7 w-7 text-violet-400" />}
            title="Smart Notes"
            description="Create rich notes with markdown, folders, tags, and AI assistance."
          />

          <FeatureCard
            icon={<Zap className="h-7 w-7 text-violet-400" />}
            title="AI Summaries"
            description="Generate summaries, rewrite content, and extract key insights instantly."
          />

          <FeatureCard
            icon={<Users className="h-7 w-7 text-violet-400" />}
            title="Team Collaboration"
            description="Invite members, share workspaces, and collaborate in real time."
          />
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">Simple pricing</h2>

          <p className="mt-5 text-lg text-zinc-400">
            Start free and upgrade when your team grows.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Free */}
          <PricingCard
            title="Free"
            price="$0"
            description="Perfect for personal note taking."
            features={[
              "Unlimited notes",
              "AI summaries",
              "1 workspace",
              "Basic collaboration",
            ]}
            button="Get Started"
          />

          {/* Pro */}
          <PricingCard
            featured
            title="Pro"
            price="$19"
            description="For creators and growing teams."
            features={[
              "Unlimited workspaces",
              "Advanced AI tools",
              "Team collaboration",
              "Priority support",
            ]}
            button="Upgrade Now"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-28">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-12 text-center backdrop-blur-2xl">
          <h2 className="text-4xl font-black md:text-6xl">
            Start building your knowledge system today
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            Organize your thoughts, automate workflows, and unlock AI-powered
            productivity.
          </p>

          <Link
            href="/sign-up"
            className="mt-10 inline-flex rounded-2xl bg-violet-600 px-8 py-4 text-lg font-semibold transition hover:bg-violet-500"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-zinc-950">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-violet-400" />
            <span className="font-semibold">NoteAI</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-zinc-400">
            <Link href="/features">Features</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/sign-in">Sign In</Link>
          </div>

          <p className="text-sm text-zinc-500">
            © 2026 NoteAI. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      <div className="mb-5">{icon}</div>

      <h3 className="text-2xl font-bold">{title}</h3>

      <p className="mt-4 leading-7 text-zinc-400">{description}</p>
    </div>
  );
}

function PricingCard({
  title,
  price,
  description,
  features,
  button,
  featured = false,
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  button: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl border p-10 backdrop-blur-xl ${
        featured
          ? "border-violet-500 bg-violet-500/10"
          : "border-white/10 bg-white/5"
      }`}
    >
      <h3 className="text-3xl font-bold">{title}</h3>

      <div className="mt-5 flex items-end gap-2">
        <span className="text-5xl font-black">{price}</span>
        <span className="pb-1 text-zinc-400">/month</span>
      </div>

      <p className="mt-5 text-zinc-400">{description}</p>

      <ul className="mt-8 space-y-4">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <Check className="h-5 w-5 text-violet-400" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`mt-10 w-full rounded-2xl px-6 py-4 font-semibold transition ${
          featured
            ? "bg-violet-600 hover:bg-violet-500"
            : "bg-white/10 hover:bg-white/20"
        }`}
      >
        {button}
      </button>
    </div>
  );
}
