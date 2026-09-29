import { Button } from "@/components/ui/button";
import Link from "next/link";

type CTASectionProps = {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
};

export function CTASection(props: CTASectionProps) {
  const { title, description, buttonText, buttonHref } = props;

  return (
    <div className="p-8 md:p-14 card text-center">
      <h2 className="text-4xl font-black md:text-6xl">{title}</h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">{description}</p>

      <Button className="mt-10 h-16 font-semibold px-8 py-4 text-lg" asChild>
        <Link href={buttonHref}>{buttonText}</Link>
      </Button>
    </div>
  );
}
