import { env } from "@/data/env/server";
import { releaseExpiredAiRequests } from "@/features/ai/server/mutations/release-expired-ai-request";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", {
      status: 401,
    });
  }

  const result = await releaseExpiredAiRequests();

  return NextResponse.json({
    success: true,
    released: result.released,
  });
}
