import Link from "next/link";
import { Check, Sparkles, Zap, Shield, Users } from "lucide-react";
import { CTASection } from "@/features/marketing/components/cta-section";
import Hero from "@/components/home/hero";
import PricingCardList from "@/components/home/pricing-card-list";
import FeatureCard from "@/components/home/feature-card";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for personal note taking and trying the platform.",
    button: "Get Started",
    href: "/sign-up",
    featured: false,
    features: [
      "Unlimited notes",
      "1 workspace",
      "AI summaries",
      "Markdown editor",
      "Basic collaboration",
      "Community support",
    ],
  },

  {
    name: "Pro",
    price: "$19",
    description: "Best for creators, students, and productivity power users.",
    button: "Upgrade to Pro",
    href: "/sign-up",
    featured: true,
    features: [
      "Unlimited workspaces",
      "Advanced AI tools",
      "AI note generation",
      "Unlimited folders",
      "Team collaboration",
      "Priority support",
    ],
  },

  {
    name: "Business",
    price: "$49",
    description: "Advanced collaboration and management for teams.",
    button: "Contact Sales",
    href: "/sign-up",
    featured: false,
    features: [
      "Unlimited team members",
      "Admin dashboard",
      "Workspace analytics",
      "Advanced permissions",
      "AI usage controls",
      "Premium support",
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <Hero
        shortLabel="Simple & Transparent Pricing"
        title={<TitleDisplay />}
        desc="Start free and scale your productivity with powerful AI tools, collaboration, and workspace management."
      />

      {/* Pricing Cards */}
      <PricingCardList />

      {/* Features Row */}
      <section className="mx-auto max-w-7xl px-6 pb-28">
        <div className="grid gap-8 md:grid-cols-3">
          <FeatureCard
            icon={Zap}
            title="Powerful AI"
            description="Generate summaries, rewrite notes, and organize information instantly."
          />

          <FeatureCard
            icon={Users}
            title="Team Collaboration"
            description="Invite members, manage permissions, and collaborate in real time."
          />
          <FeatureCard
            icon={Shield}
            title="Secure Workspace"
            description="Protected infrastructure with secure authentication and permissions."
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-5xl px-6 pb-28">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">
            Frequently asked questions
          </h2>
        </div>

        <div className="space-y-6">
          <FaqItem
            question="Can I use the platform for free?"
            answer="Yes. The free plan includes unlimited notes and basic AI features."
          />

          <FaqItem
            question="Can I cancel anytime?"
            answer="Yes. You can upgrade, downgrade, or cancel your subscription anytime."
          />

          <FaqItem
            question="Do you support teams?"
            answer="Yes. Pro and Business plans include collaboration and workspace management."
          />

          <FaqItem
            question="How does AI usage work?"
            answer="AI usage is included monthly depending on your subscription plan."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <CTASection
          title="Ready to boost your productivity?"
          description="Join creators, developers, students, and teams using AI to organize
            their knowledge smarter."
          buttonText="Start Free Today"
          buttonHref="/sign-up"
        />
      </section>
    </>
  );
}

function TitleDisplay() {
  return (
    <h1 className="text-5xl max-w-5xl font-black leading-tight tracking-tight md:text-7xl">
      Pricing built for
      <span className="text-gradient"> every workflow</span>
    </h1>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      <h3 className="text-xl font-semibold">{question}</h3>

      <p className="mt-4 leading-7 text-zinc-400">{answer}</p>
    </div>
  );
}
