import Link from "next/link";
import { Check, Sparkles, Zap, Shield, Users } from "lucide-react";
import { CTASection } from "@/features/marketing/components/cta-section";
import Hero from "@/components/home/hero";

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
      <section className="mx-auto max-w-7xl px-6 pb-28">
        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-[32px] border p-10 backdrop-blur-2xl ${
                plan.featured
                  ? "border-violet-500 bg-violet-500/10"
                  : "border-white/10 bg-white/5"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <h2 className="text-3xl font-bold">{plan.name}</h2>

              <div className="mt-6 flex items-end gap-2">
                <span className="text-6xl font-black">{plan.price}</span>

                <span className="pb-2 text-zinc-400">/month</span>
              </div>

              <p className="mt-5 leading-7 text-zinc-400">{plan.description}</p>

              <Link
                href={plan.href}
                className={`mt-10 flex w-full items-center justify-center rounded-2xl px-6 py-4 text-lg font-semibold transition ${
                  plan.featured
                    ? "bg-violet-600 hover:bg-violet-500"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                {plan.button}
              </Link>

              <div className="my-10 h-px bg-white/10" />

              <ul className="space-y-5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-violet-400" />

                    <span className="text-zinc-200">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Features Row */}
      <section className="mx-auto max-w-7xl px-6 pb-28">
        <div className="grid gap-8 md:grid-cols-3">
          <FeatureBox
            icon={<Zap className="h-7 w-7 text-violet-400" />}
            title="Powerful AI"
            description="Generate summaries, rewrite notes, and organize information instantly."
          />

          <FeatureBox
            icon={<Users className="h-7 w-7 text-violet-400" />}
            title="Team Collaboration"
            description="Invite members, manage permissions, and collaborate in real time."
          />

          <FeatureBox
            icon={<Shield className="h-7 w-7 text-violet-400" />}
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

function FeatureBox({
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

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      <h3 className="text-xl font-semibold">{question}</h3>

      <p className="mt-4 leading-7 text-zinc-400">{answer}</p>
    </div>
  );
}
