import { Zap } from "lucide-react";

export function AIUsageCard() {
  return (
    <div className="p-5 glass rounded-3xl">
      <div className="flex items-center gap-2">
        <Zap className="size-5 icon" />

        <h3 className="font-semibold">AI Usage</h3>
      </div>

      <div className="mt-5">
        <div className="flex justify-between text-sm">
          <span className="text-muted">Monthly Tokens</span>

          <span>72%</span>
        </div>

        <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[72%] rounded-full bg-primary" />
        </div>

        <p className="mt-4 text-sm text-muted">72,000 / 100,000 used</p>
      </div>
    </div>
  );
}
