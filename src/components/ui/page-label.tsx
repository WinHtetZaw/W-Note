import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { ReactNode } from "react";

type PageLabelProps = {
  label: string;
  className?: string;
  icon?: ReactNode;
};

export default function PageLabel({ label, className, icon }: PageLabelProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm",
        className,
      )}
    >
      {icon ?? <Sparkles className="size-4 text-icon" />}
      {label}
    </div>
  );
}
