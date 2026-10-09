import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type Props = {
  icon?: LucideIcon;
  title: string;
  description: string;
  className?: string;
};

export default function EmptyState(props: Props) {
  const { icon: Icon, title, description, className } = props;
  return (
    <div
      className={cn(
        " flex flex-col gap-2 items-center justify-center",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        {Icon && (
          <div className="size-10 content-center justify-items-center rounded-xl bg-muted/50">
            <Icon className="size-5 text-muted-foreground" />
          </div>
        )}
        <p className="font-medium">{title}</p>
      </div>
      <p className="max-w-xs text-sm text-muted">{description}</p>
    </div>
  );
}
