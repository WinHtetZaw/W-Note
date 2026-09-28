import { Zap, Shield, Users } from "lucide-react";
import { CTASection } from "@/features/marketing/components/cta-section";
import Hero from "@/components/home/hero";
import PricingCardList from "@/components/home/pricing-card-list";
import FeatureCard from "@/components/home/feature-card";
import FaqItem from "@/components/home/faq-item";

export default function PricingPage() {
  return (
    <>
      <Hero
        shortLabel="Simple & Transparent Pricing"
        title={<TitleDisplay />}
        desc="Start free and scale your productivity with powerful AI tools, collaboration, and workspace management."
        className="section-padding-block"
      />

      {/* Pricing Cards */}
      <PricingCardList />

      {/* Features Row */}
      <section className="mx-auto max-w-7xl section-padding-block">
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
      <section className="mx-auto max-w-5xl section-padding-block">
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
      <section className="mx-auto max-w-6xl section-padding-block">
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
