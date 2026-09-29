import { cn } from "@/lib/utils";
import { LucideIcon, Sparkles } from "lucide-react";

type PageLabelProps = {
  label: string;
  className?: string;
  icon?: LucideIcon;
};

export default function PageLabel({ label, className, icon }: PageLabelProps) {
  const Icon = icon ? icon : Sparkles;
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm",
        className,
      )}
    >
      <Icon className="size-4 text-icon" />
      {label}
    </div>
  );
}
