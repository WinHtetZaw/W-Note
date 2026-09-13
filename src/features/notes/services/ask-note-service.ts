import { requirePermission } from "@/lib/permissions";
import { ErrorReason } from "@/lib/errors";
import { fail, ok } from "@/lib/result";
import { getNoteById } from "../server/queries/get-note-by-id";
import z from "zod";
import { generateTextService } from "@/features/ai/services/generate-text-service";
import { recordAIUsage } from "@/features/ai/server/mutations/record-ai-usage";

const schema = z.object({
  workspaceId: z.uuid(),
  noteId: z.uuid(),
  question: z.string(),
});

type IncomingData = z.infer<typeof schema>;

export async function askNoteService(rawData: IncomingData) {
  //========= Validating incoming data ========//
  const validated = schema.safeParse(rawData);
  if (!validated.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: validated.error });
  }
  const { workspaceId, noteId, question } = validated.data;

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
        message: "Question is required.",
      },
    });
  }

  const [aiError, generatedData] = await generateTextService({
    requestType: "ask_note",
    variables: { content: note.content, question },
  });

  if (aiError) {
    return fail({ reason: aiError.reason });
  }

  try {
    await recordAIUsage({
      userId,
      workspaceId: workspaceId,
      requestType: generatedData.requestType,
      provider: "groq",
      model: "openai/gpt-oss-20b",
      inputTokens: generatedData.usage?.prompt_tokens ?? 0,
      outputTokens: generatedData.usage?.completion_tokens ?? 0,
    });

    return ok({
      answer: generatedData.text,
      usage: generatedData.usage,
      requestType: "summarize_note",
    });
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
