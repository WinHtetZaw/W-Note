"use server";

import { requireNoteEdit } from "@/lib/permissions";
import {
  UpdateNoteInput,
  updateNoteSchema,
} from "../../schemas/update-note-schema";
import { updateNote } from "../mutations/update-note";

export async function editNote(input: UpdateNoteInput) {
  // auth and permission
  // await requireNoteEdit(input.noteId);

  // validate incoming data
  const { success, data } = updateNoteSchema.safeParse(input);
  if (!success) {
    return { success, message: "Invalid folder data" };
  }

  // updating note
  const note = await updateNote({ ...data }, data.noteId);
  if (!note) {
    return { success: false, message: "Fail to create note" };
  }

  // todo revalidate
  return { success: true, data: note };
}
