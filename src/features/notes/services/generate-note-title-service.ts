import { requirePermission } from "@/lib/authz";
import { ErrorReason } from "@/lib/errors";
import { fail, ok } from "@/lib/result";
import { getNoteById } from "../server/queries/get-note-by-id";
import z from "zod";
import { generateTextService } from "@/features/ai/services/generate-text-service";
import { recordAIUsage } from "@/features/ai/server/mutations/record-ai-usage";

const schema = z.object({ workspaceId: z.uuid(), noteId: z.uuid() });

type IncomingData = z.infer<typeof schema>;

export async function generateNoteTitleService(rawData: IncomingData) {
  //========= Validating incoming data ========//
  const validated = schema.safeParse(rawData);
  if (!validated.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: validated.error });
  }
  const { workspaceId, noteId } = validated.data;

  const [permissionError, member] = await requirePermission(
    workspaceId,
    "ai:use",
  );
  if (permissionError) {
    return fail({ reason: permissionError.reason });
  }
  const userId = member.user.id;

  const note = await getNoteById({ workspaceId, noteId });
  if (!note) {
    return fail({ reason: ErrorReason.NoteNotFound });
  }

  if (!note.content?.trim()) {
    return fail({
      reason: "INVALID_INPUT",
      details: {
        field: "content",
        message: "Note has no content to summarize.",
      },
    });
  }

  const [aiError, generatedData] = await generateTextService({
    requestType: "generate_title",
    variables: { content: note.content },
  });

  if (aiError) {
    return fail({ reason: aiError.reason });
  }

  const { requestType, usage, text } = generatedData;
  const title = text.trim();
  const inputTokens = usage?.prompt_tokens ?? 0;
  const outputTokens = usage?.completion_tokens ?? 0;

  try {
    await recordAIUsage({
      userId,
      workspaceId: workspaceId,
      requestType,
      provider: "groq",
      model: "openai/gpt-oss-20b",
      inputTokens,
      outputTokens,
    });

    return ok({ title, usage, requestType });
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
