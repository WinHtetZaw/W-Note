import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";

interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

export function CTASection({
  title,
  description,
  buttonText,
  buttonHref,
}: CTASectionProps) {
  return (
    <GlassCard className="p-14 text-center">
      <h2 className="text-4xl font-black md:text-6xl">{title}</h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
        {description}
      </p>

      <Link
        href={buttonHref}
        className="mt-10 inline-flex rounded-2xl bg-violet-600 px-8 py-4 text-lg font-semibold transition hover:bg-violet-500"
      >
        {buttonText}
      </Link>
    </GlassCard>
  );
}
