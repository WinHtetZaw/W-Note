import Link from "next/link";
import {
  Sparkles,
  FileText,
  FolderTree,
  Users,
  Zap,
  Shield,
  Search,
  Wand2,
  Clock3,
  CheckCircle2,
} from "lucide-react";
import { CTASection } from "@/features/marketing/components/cta-section";

const features = [
  {
    icon: <Sparkles className="h-7 w-7 text-violet-400" />,
    title: "AI Writing Assistant",
    description:
      "Generate notes, summaries, outlines, and rewrites instantly with AI.",
  },

  {
    icon: <FileText className="h-7 w-7 text-violet-400" />,
    title: "Rich Note Editor",
    description:
      "Write beautiful notes with markdown support, formatting, and embeds.",
  },

  {
    icon: <FolderTree className="h-7 w-7 text-violet-400" />,
    title: "Folders & Organization",
    description:
      "Organize your knowledge using folders, tags, and nested workspaces.",
  },

  {
    icon: <Search className="h-7 w-7 text-violet-400" />,
    title: "Smart Search",
    description:
      "Quickly find notes, folders, and AI-generated insights across workspaces.",
  },

  {
    icon: <Users className="h-7 w-7 text-violet-400" />,
    title: "Team Collaboration",
    description:
      "Invite members, collaborate in real time, and manage permissions.",
  },

  {
    icon: <Shield className="h-7 w-7 text-violet-400" />,
    title: "Secure Workspaces",
    description:
      "Protected infrastructure with secure authentication and role management.",
  },
];

const productivity = [
  "AI note summarization",
  "Realtime collaboration",
  "Unlimited note organization",
  "Workspace management",
  "Advanced AI prompts",
  "Fast markdown editing",
];

export default function FeaturesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-6 py-28 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-violet-400" />
            Powerful AI Productivity Features
          </div>

          <h1 className="text-5xl font-black leading-tight tracking-tight md:text-7xl">
            Everything you need to
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              {" "}
              manage knowledge smarter
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-zinc-400 md:text-xl">
            Capture ideas, organize notes, collaborate with teams, and automate
            your workflow using modern AI tools.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/sign-up"
              className="rounded-2xl bg-violet-600 px-8 py-4 text-lg font-semibold transition hover:bg-violet-500"
            >
              Start Free
            </Link>

            <Link
              href="/pricing"
              className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-lg font-semibold backdrop-blur-xl transition hover:bg-white/10"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-[30px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"
            >
              <div className="mb-5">{feature.icon}</div>

              <h3 className="text-2xl font-bold">{feature.title}</h3>

              <p className="mt-4 leading-7 text-zinc-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Showcase Section */}
      <section className="mx-auto max-w-7xl px-6 py-28">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left */}
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-md">
              <Wand2 className="h-4 w-4 text-violet-400" />
              AI Workspace Experience
            </div>

            <h2 className="text-4xl font-black leading-tight md:text-6xl">
              Built for creators, developers, and teams
            </h2>

            <p className="mt-8 text-lg leading-8 text-zinc-400">
              Manage notes, automate repetitive writing tasks, and collaborate
              faster with an AI-powered workflow.
            </p>

            <div className="mt-10 space-y-5">
              {productivity.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-violet-400" />

                  <span className="text-lg text-zinc-200">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
              {/* Fake Dashboard */}
              <div className="rounded-3xl border border-white/10 bg-zinc-900/80 p-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-lg font-semibold">AI Workspace</h3>

                    <p className="text-sm text-zinc-400">
                      Smart productivity dashboard
                    </p>
                  </div>

                  <div className="rounded-full bg-violet-500/20 px-3 py-1 text-sm text-violet-300">
                    Pro
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-3">
                      <Clock3 className="h-5 w-5 text-violet-400" />

                      <span className="font-medium">
                        AI summarized meeting notes
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-zinc-400">
                      Generated summary with action items and key discussion
                      points.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-violet-400" />

                      <span className="font-medium">
                        Smart content generation
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-zinc-400">
                      AI generated project outline and task breakdown
                      automatically.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-violet-400" />

                      <span className="font-medium">
                        Team collaboration enabled
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-zinc-400">
                      Shared workspace with comments and realtime updates.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Glow */}
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-600/20 blur-[90px]" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <CTASection
          title="Ready to build your second brain?"
          description="Start organizing your knowledge with AI-powered productivity tools and collaborative workspaces."
          buttonText="Create Free Account"
          buttonHref="/sign-up"
        />
      </section>
    </>
  );
}
