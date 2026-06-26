import Link from "next/link";
import { FileText, Users, Zap, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Hero from "@/components/home/hero";
import FeatureCard from "@/components/home/feature-card";

export default function LandingPage() {
  return (
    <>
      <Hero
        shortLabel="AI-Powered Smart Notes"
        title={<TitleDisplay />}
        desc="Capture ideas, organize knowledge, summarize notes, and collaborate with your team using powerful AI tools."
        links={<LinksDisplay />}
      />

      {/* Features */}
      <section className="py-24">
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
            icon={<FileText className="size-7 text-primary" />}
            title="Smart Notes"
            description="Create rich notes with markdown, folders, tags, and AI assistance."
          />

          <FeatureCard
            icon={<Zap className="size-7 text-primary" />}
            title="AI Summaries"
            description="Generate summaries, rewrite content, and extract key insights instantly."
          />

          <FeatureCard
            icon={<Users className="size-7 text-primary" />}
            title="Team Collaboration"
            description="Invite members, share workspaces, and collaborate in real time."
          />
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-24">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">Simple pricing</h2>

          <p className="mt-5 text-lg text-muted">
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
        <div className="glass p-12 text-center">
          <h2 className="text-4xl font-black md:text-6xl">
            Start building your knowledge system today
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            Organize your thoughts, automate workflows, and unlock AI-powered
            productivity.
          </p>

          <Button asChild className="mt-10 text-lg font-semibold p-8">
            <Link href="/sign-up">Create Free Account</Link>
          </Button>
        </div>
      </section>
    </>
  );
}

function TitleDisplay() {
  return (
    <h1 className="max-w-5xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
      Your Second Brain
      <span className="text-gradient"> Powered by AI</span>
    </h1>
  );
}

function LinksDisplay() {
  return (
    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
      <Button asChild className="text-lg font-semibold px-8 py-7.5">
        <Link href="/sign-up">Start Free</Link>
      </Button>

      <Button
        asChild
        variant="outline"
        className="text-lg font-semibold px-8 py-7.5"
      >
        <Link href="/features">Explore Features</Link>
      </Button>
    </div>
  );
}

// function FeatureCard({
//   icon,
//   title,
//   description,
// }: {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
// }) {
//   return (
//     <div className="glass p-8">
//       <div className="mb-5">{icon}</div>
//       <h3 className="text-2xl font-bold">{title}</h3>
//       <p className="mt-4 leading-7 text-muted">{description}</p>
//     </div>
//   );
// }

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
      // className={`rounded-3xl border p-10 backdrop-blur-xl ${
      //   featured
      //     ? "border-violet-500 bg-violet-500/10"
      //     : "border-white/10 bg-white/5"
      // }`}
      className={cn(
        "rounded-3xl border p-10 backdrop-blur-xl bg-white/5",
        featured && " border border-violet-500 bg-violet-500/10",
      )}
    >
      <h3 className="text-3xl font-bold">{title}</h3>

      <div className="mt-5 flex items-end gap-2">
        <span className="text-5xl font-black">{price}</span>
        <span className="pb-1 text-muted">/month</span>
      </div>

      <p className="mt-5 text-muted">{description}</p>

      <ul className="mt-8 space-y-4">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <Check className="size-5 text-primary" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        variant={featured ? "default" : "outline"}
        className="w-full mt-10"
      >
        {button}
      </Button>
    </div>
  );
}
