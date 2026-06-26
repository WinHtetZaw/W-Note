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
import Hero from "@/components/home/hero";
import FeatureCard from "@/components/home/feature-card";

const features = [
  {
    icon: Sparkles,
    title: "AI Writing Assistant",
    description:
      "Generate notes, summaries, outlines, and rewrites instantly with AI.",
  },

  {
    icon: FileText,
    title: "Rich Note Editor",
    description:
      "Write beautiful notes with markdown support, formatting, and embeds.",
  },

  {
    icon: FolderTree,
    title: "Folders & Organization",
    description:
      "Organize your knowledge using folders, tags, and nested workspaces.",
  },

  {
    icon: Search,
    title: "Smart Search",
    description:
      "Quickly find notes, folders, and AI-generated insights across workspaces.",
  },

  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Invite members, collaborate in real time, and manage permissions.",
  },

  {
    icon: Shield,
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
      <Hero
        shortLabel="Powerful AI Productivity Features"
        title={<TitleDisplay />}
        desc="Capture ideas, organize notes, collaborate with teams, and automate your workflow using modern AI tools."
        links={<LinksDisplay />}
      />

      {/* Main Features */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, description, icon: Icon }) => (
            <FeatureCard
              key={title}
              icon={<Icon className="size-7 text-primary" />}
              title={title}
              description={description}
            />
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
            <div className="rounded-[36px] border border-white/10 bg-white/5 px-8 py-12 backdrop-blur-2xl">
              {/* Fake Dashboard */}
              <div className="">
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
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-600/30 blur-[90px]" />
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

function TitleDisplay() {
  return (
    <h1 className="text-5xl font-black leading-tight tracking-tight md:text-7xl">
      Everything you need to
      <span className="text-gradient"> manage knowledge smarter</span>
    </h1>
  );
}

function LinksDisplay() {
  return (
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
  );
}
