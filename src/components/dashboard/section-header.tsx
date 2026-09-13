import { ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  icon: ReactNode;
};

export default function SectionHeader(props: Props) {
  const { title, description, icon } = props;
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400">
        {icon}
      </div>

      <div>
        <h2 className="text-2xl font-bold">{title}</h2>

        <p className="mt-1 text-sm text-zinc-500">{description}</p>
      </div>
    </div>
  );
}
