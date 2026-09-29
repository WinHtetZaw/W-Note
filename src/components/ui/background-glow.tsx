import { cn } from "@/lib/utils";

export default function BackgroundGlow({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 -z-10", className)}>
      <div className="absolute left-1/2 top-0 h-125 w-[min(500px,100%)] -translate-x-1/2 rounded-full bg-violet-600/30 blur-[140px]" />
    </div>
  );
}
