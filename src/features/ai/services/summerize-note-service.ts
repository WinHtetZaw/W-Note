import { fail, ok } from "@/lib/result";
import { generateText } from "./generate-text-service";
import { ErrorReason } from "@/lib/errors";
import { getNote } from "@/features/notes/server/queries/get-note-by-id";

type SummarizeNoteInput = string;

export async function summarizeNoteService(input: SummarizeNoteInput) {
  // 1. Authenticate
  // 2. Check workspace permission
  // 3. Fetch note
  // 4. Generate summary

  // const note = await getNote(input.noteId);

  // if (!note) {
  //   return fail({ reason: ErrorReason.NoteNotFound });
  // }

  const [aiError, result] = await generateText({
    prompt: {
      systemPrompt: `
        You are an AI assistant for a note-taking application.

        Always:
        - Be accurate.
        - Do not invent information.
        - Preserve important facts.
        - Follow the user's requested format.
        `,

      userPrompt: `
        Summarize this note:

        ${input}
        `,
    },
  });

  if (aiError) {
    return fail({ reason: aiError.reason });
  }

  return ok({ summary: result.text, usage: result.usage });
}
