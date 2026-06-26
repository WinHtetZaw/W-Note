import { Sparkles } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  shortLabel: string;
  title: ReactNode;
  desc: string;
  links?: ReactNode;
};

export default function Hero(props: Props) {
  const { shortLabel, title, desc, links } = props;
  return (
    <section className="relative">
      <div className="flex flex-col items-center py-28 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-sm backdrop-blur-md">
          <Sparkles className="size-4 text-primary" />
          {shortLabel}
        </div>

        {title}

        <p className="mt-8 max-w-2xl text-lg leading-8 text-muted md:text-xl">
          {desc}
        </p>

        {links && links}
      </div>
    </section>
  );
}
