import { fetchAIUsageStatus } from "@/features/ai/server/actions/fetch-ai-usage-status";
import { formatNumber, formatNumberToPercentage } from "@/utils/formatting";
import { Zap } from "lucide-react";
import { Progress } from "../ui/progress";

export async function AIUsageCard({ workspaceId }: { workspaceId: string }) {
  const result = await fetchAIUsageStatus(workspaceId);

  if (result.code) {
    throw new Error("Fail to fetch AI usage.");
  }

  const { usage, limit, remaining } = result.data;
  const maximunRequest = limit == null ? "unlimited" : formatNumber(limit);
  const remainRequest = remaining === null ? 0 : formatNumber(remaining);
  const usedRequest = formatNumber(usage);

  return (
    <div className="p-5 glass rounded-3xl">
      <div className="flex items-center gap-2">
        <Zap className="size-5 icon" />

        <h3 className="font-semibold">AI Usage</h3>
      </div>

      <div className="mt-5">
        <div className="flex justify-between text-sm">
          <span className="text-muted">Monthly Request</span>

          <span>{formatNumberToPercentage(usedRequest, maximunRequest)}%</span>
        </div>

        <Progress value={33} className="h-3 mt-4" />

        <p className="mt-4 text-sm text-muted">
          {usedRequest} / {maximunRequest} used
        </p>
      </div>
    </div>
  );
}
