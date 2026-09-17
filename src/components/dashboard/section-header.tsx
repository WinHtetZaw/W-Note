import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  icon: ReactNode;
};

export default function SectionHeader(props: Props) {
  const { title, description, icon } = props;
  return (
    <div
      className={cn(
        "flex  gap-4",
        description ? "items-start" : "items-center",
      )}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 text-icon">
        {icon}
      </div>

      <div>
        <h2 className="text-2xl font-bold">{title}</h2>

        <p className="mt-1 text-sm text-zinc-500">{description}</p>
      </div>
    </div>
  );
}
