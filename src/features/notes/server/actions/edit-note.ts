"use server";

import { requireNoteEdit } from "@/lib/permissions";
import {
  UpdateNoteInput,
  updateNoteSchema,
} from "../../schemas/update-note-schema";
import { updateNote } from "../mutations/update-note";
import { fail, ok, Result } from "@/lib/types";
import { Note } from "../queries/get-note";

export async function editNote(
  input: UpdateNoteInput,
): Promise<Result<unknown>> {
  // auth and permission
  const user = await requireNoteEdit(input.noteId);

  // validate incoming data
  const { success, data } = updateNoteSchema.safeParse(input);
  if (!success) {
    return fail("Invalid input data");
  }

  // updating note
  const note = await updateNote(
    { title: data.title, content: data.content },
    data.noteId,
    user.authorId,
  );
  if (!note) {
    return fail("Fail to update note");
  }

  // todo revalidate
  return ok(note, "Successfully updated note");
}
