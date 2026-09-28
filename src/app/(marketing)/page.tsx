import Link from "next/link";
import { FileText, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Hero from "@/components/home/hero";
import FeatureCard from "@/components/home/feature-card";
import SimplePricing from "@/components/home/simple-pricing";

export default function LandingPage() {
  return (
    <>
      <Hero
        className="section-padding-block"
        shortLabel="AI-Powered Smart Notes"
        title={<TitleDisplay />}
        desc="Capture ideas, organize knowledge, summarize notes, and collaborate with your team using powerful AI tools."
        links={<LinksDisplay />}
      />

      {/* Features */}
      <section className="section-padding-block">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">
            Built for modern productivity
          </h2>

          <p className="mt-5 text-lg text-muted">
            Everything you need for AI-powered note taking.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <FeatureCard
            icon={FileText}
            title="Smart Notes"
            description="Create rich notes with markdown, folders, tags, and AI assistance."
          />

          <FeatureCard
            icon={Zap}
            title="AI Summaries"
            description="Generate summaries, rewrite content, and extract key insights instantly."
          />

          <FeatureCard
            icon={Users}
            title="Team Collaboration"
            description="Invite members, share workspaces, and collaborate in real time."
          />
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="section-padding-block">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">Simple pricing</h2>

          <p className="mt-5 text-lg text-muted">
            Start free and upgrade when your team grows.
          </p>
        </div>

        <SimplePricing />
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl section-padding-block">
        <div className="glass p-12 text-center  rounded-[32px]">
          <h2 className="text-4xl font-black md:text-6xl">
            Start building your knowledge system today
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            Organize your thoughts, automate workflows, and unlock AI-powered
            productivity.
          </p>

          <Button
            asChild
            className="mt-10 text-lg font-semibold h-auto p-8 w-fit min-w-fit whitespace-pre-wrap py-4"
          >
            <Link href="/sign-up" className=" ">
              Create Free Account
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}

function TitleDisplay() {
  return (
    <h1 className="max-w-5xl text-4xl font-black leading-tight tracking-tight md:text-7xl">
      Your Second Brain
      <span className="text-gradient block md:inline"> Powered by AI</span>
    </h1>
  );
}

function LinksDisplay() {
  return (
    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
      <Button asChild className="text-lg font-semibold">
        <Link href="/dashboard/w">Start Free</Link>
      </Button>

      <Button asChild variant="outline" className="text-lg font-semibold">
        <Link href="/features">Explore Features</Link>
      </Button>
    </div>
  );
}
