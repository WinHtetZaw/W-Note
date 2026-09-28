import { Sparkles } from "lucide-react";
import { ReactNode } from "react";
import PageLabel from "../ui/page-label";
import { cn } from "@/lib/utils";

type Props = {
  shortLabel: string;
  title: ReactNode;
  desc: string;
  links?: ReactNode;
  className?: string;
};

export default function Hero(props: Props) {
  const { shortLabel, title, desc, links, className = "" } = props;
  return (
    <section className={cn("relative", className)}>
      <div className="flex flex-col items-center text-center">
        <PageLabel className="mb-6" label={shortLabel} />
        {title}
        <p className="mt-8 max-w-2xl text-lg leading-8 text-muted md:text-xl">
          {desc}
        </p>
        {links}
      </div>
    </section>
  );
}
