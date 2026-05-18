import { cn } from "@/lib/utils";

export function GlassCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
