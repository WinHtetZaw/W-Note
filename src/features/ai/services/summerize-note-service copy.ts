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

  const result = await generateText({
    prompt: `
You are an AI assistant for a note-taking application.

Summarize the following note.

Requirements:
- Keep the important information.
- Remove unnecessary repetition.
- Use clear bullet points.
- Do not invent information.
- Keep the summary concise.

NOTE:

${input}
`,
    // ${note.content}
  });

  return ok({ summary: result.text });
}
