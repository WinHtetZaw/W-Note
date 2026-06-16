import { Sparkles } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  pageLabel: string;
  title: string;
  subTitle: string;
  link: ReactNode;
};

export default function PageHead(props: Props) {
  const { title, subTitle, link, pageLabel } = props;
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-md">
          <Sparkles className="h-4 w-4 text-violet-400" />
          {pageLabel}
        </div>

        <h1 className="text-4xl font-black md:text-5xl">{title}</h1>

        <p className="mt-4 text-lg text-zinc-400">{subTitle}</p>
      </div>

      {link}
    </div>
  );
}
