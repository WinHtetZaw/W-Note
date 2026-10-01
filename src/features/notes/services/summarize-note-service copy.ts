// import { requirePermission } from "@/lib/permissions";
// import { ErrorReason } from "@/lib/errors";
// import { fail, ok } from "@/lib/result";
// import { getNoteById } from "../server/queries/get-note-by-id";
// import z from "zod";
// import { generateTextService } from "@/features/ai/services/generate-text-service";
// import { recordAIUsage } from "@/features/ai/server/mutations/record-ai-usage";
// import { getWorkspaceEntitlements } from "@/features/billing/services/get-workspace-entitlements";
// import { reserveAiRequest } from "@/features/ai/server/mutations/reverse-ai-request";
// import { checkAIUsageService } from "@/features/ai/services/check-ai-usage-service";
// import { releaseAiRequest } from "@/features/ai/server/mutations/release-ai-quest";
// import { completeAiRequest } from "@/features/ai/server/mutations/complete-ai-request";

// const schema = z.object({ workspaceId: z.uuid(), noteId: z.uuid() });

// type IncomingData = z.infer<typeof schema>;

// export async function summarizeNoteService(rawData: IncomingData) {
//   //========= Validating incoming data ========//
//   const validated = schema.safeParse(rawData);
//   if (!validated.success) {
//     return fail({ reason: ErrorReason.InvalidInput, details: validated.error });
//   }
//   const { workspaceId, noteId } = validated.data;

//   //========== Auth and permisssion ==========//
//   const [permissionError, member] = await requirePermission(
//     workspaceId,
//     "ai:use",
//   );
//   if (permissionError) {
//     return fail({ reason: permissionError.reason });
//   }
//   const userId = member.user.id;

//   //========= Get Note ========//
//   const note = await getNoteById({ workspaceId, noteId });
//   if (!note) {
//     return fail({ reason: ErrorReason.NoteNotFound });
//   }

//   if (!note.content?.trim()) {
//     return fail({
//       reason: "INVALID_INPUT",
//       details: {
//         field: "content",
//         message: "Note has no content to summarize.",
//       },
//     });
//   }

//   const aiQuota = await checkAIUsageService(workspaceId);
//   if (!aiQuota.allowed) {
//     return fail({
//       reason: ErrorReason.AIUsageLimitReached,
//     });
//   }

//     // =========================================
//   // Call AI provider
//   // =========================================

//   const [aiError, generatedData] =
//     await generateTextService({
//       requestType: "summarize_note",
//       variables: {
//         content: note.content,
//       },
//     });

//   ////////////////////////////////////////////////////////////////////////////////////////

//   // =========================================
//   // Generate with AI
//   // =========================================

//   try {
//     const [aiError, generatedData] = await generateTextService({
//       requestType: "summarize_note",
//       variables: {
//         content: note.content,
//       },
//     });

//     // -----------------------------------------
//     // AI provider failed
//     // -----------------------------------------

//     if (aiError) {
//       await releaseAiRequest(aiQuota.reservationId);
//       return fail({ reason: aiError.reason });
//     }

//     const { requestType, usage, text: summary } = generatedData;

//     const inputTokens = usage?.prompt_tokens ?? 0;

//     const outputTokens = usage?.completion_tokens ?? 0;

//     // =========================================
//     // Complete reservation + record usage
//     // =========================================

//     const completion = await completeAiRequest({
//       reservationId: aiQuota.reservationId,

//       workspaceId,
//       userId,

//       requestType,
//       provider: "groq",
//       model: "openai/gpt-oss-20b",

//       inputTokens,
//       outputTokens,

//       // Use your actual cost calculation here.
//       costInCents: 0,
//     });

//     if (!completion.completed) {
//       return fail({
//         reason: ErrorReason.UnexpectedError,
//       });
//     }

//     return ok({
//       summary,
//       usage,
//       requestType,
//     });
//   } catch {
//     // =========================================
//     // Provider/service failure
//     // =========================================

//     await releaseAiRequest(aiQuota.reservationId);

//     return fail({
//       reason: ErrorReason.UnexpectedError,
//     });
//   }

//   //========= Generate With AI ========//
//   const [aiError, generatedData] = await generateTextService({
//     requestType: "summarize_note",
//     variables: { content: note.content },
//   });

//   if (aiError) {
//     return fail({ reason: aiError.reason });
//   }

//   const { requestType, usage, text: summary } = generatedData;
//   const inputTokens = usage?.prompt_tokens ?? 0;
//   const outputTokens = usage?.completion_tokens ?? 0;

//   //========= Record usage in db ========//
//   try {
//     await recordAIUsage({
//       userId,
//       workspaceId,
//       requestType,
//       provider: "groq",
//       model: "openai/gpt-oss-20b",
//       inputTokens,
//       outputTokens,
//     });

//     return ok({ summary, usage, requestType });
//   } catch {
//     return fail({ reason: ErrorReason.UnexpectedError });
//   }
// }
