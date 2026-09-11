// app/api/ai/summarize/route.ts

import { streamWithGroq } from "@/features/ai/providers/groq";

export async function POST(request: Request) {
  const { content } = await request.json();

  if (!content) {
    return new Response("Content is required", {
      status: 400,
    });
  }

  const stream = await streamWithGroq(`
Summarize the following note.

Requirements:
- Keep important information.
- Remove unnecessary repetition.
- Do not invent information.
- Use concise bullet points.

Note:

${content}
`);

  const encoder = new TextEncoder();

  const readableStream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content;

          if (text) {
            controller.enqueue(encoder.encode(text));
          }
        }

        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });

  return new Response(readableStream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
