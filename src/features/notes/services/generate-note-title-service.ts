import { requirePermission } from "@/lib/permissions";
import { ErrorReason } from "@/lib/errors";
import { fail, ok } from "@/lib/result";
import { getNoteById } from "../server/queries/get-note-by-id";
import z from "zod";
import { executeAiRequestService } from "@/features/ai/services/execute-ai-request-service";

const schema = z.object({ workspaceId: z.uuid(), noteId: z.uuid() });

type IncomingData = z.infer<typeof schema>;

export async function generateNoteTitleService(rawData: IncomingData) {
  //========= Validating incoming data ========//
  const validated = schema.safeParse(rawData);
  if (!validated.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: validated.error });
  }
  const { workspaceId, noteId } = validated.data;

  //========== Auth and permisssion ==========//
  const [permissionError, member] = await requirePermission(
    workspaceId,
    "ai:use",
  );
  if (permissionError) {
    return fail({ reason: permissionError.reason });
  }
  const userId = member.user.id;

  //========= Getting Note ========//
  const note = await getNoteById({ workspaceId, noteId });
  if (!note) {
    return fail({ reason: ErrorReason.NoteNotFound });
  }

  if (!note.content?.trim()) {
    return fail({
      reason: "INVALID_INPUT",
      details: {
        field: "content",
        message: "Note has no content to generate a title.",
      },
    });
  }

  //========= AI ========//
  const [aiError, generated] = await executeAiRequestService({
    workspaceId,
    userId,
    requestType: "generate_title",
    variables: { content: note.content },
  });

  if (aiError) {
    return fail({ reason: aiError.reason });
  }

  return ok({
    title: generated.text,
    usage: generated.usage,
    requestType: generated.requestType,
  });
}
