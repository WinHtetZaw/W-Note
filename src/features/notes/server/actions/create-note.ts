"use server";

import { requireWorkspaceMember } from "@/lib/permissions";
import {
  // CreateNoteInput,
  createNoteSchema,
} from "../../schemas/create-note-schema";
import { insertNote } from "../mutations/insert-note";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type CreateNoteInput = {
  workspaceId: string;
  folderId?: string | null;
};

export async function createNote(input: CreateNoteInput) {
  // Auth and permission check
  const { workspaceId, folderId = null } = input;
  const { user } = await requireWorkspaceMember(input.workspaceId);

  // validate incoming data
  // const { success, data } = createNoteSchema.safeParse(input);
  // if (!success) {
  //   return { success, message: "Invalid folder data" };
  // }

  // creating note
  const note = await insertNote(workspaceId, user.id, folderId);
  if (!note) {
    return { success: false, message: "Fail to create note" };
  }

  //todo revalidate

  // return { success: true, data: note };
  revalidatePath(`/dashboard/w/${workspaceId}`);
  redirect(`/dashboard/w/${workspaceId}/notes/${note.id}`);
}

// export async function createNote(input: CreateNoteInput) {
//   // Auth and permission check
//   const { user } = await requireWorkspaceMember(input.workspaceId);

//   // validate incoming data
//   const { success, data } = createNoteSchema.safeParse(input);
//   if (!success) {
//     return { success, message: "Invalid folder data" };
//   }

//   // creating note
//   const note = await insertNote({ ...data, authorId: user.id });
//   if (!note) {
//     return { success: false, message: "Fail to create note" };
//   }

//   //todo revalidate

//   return { success: true, data: note };
// }
