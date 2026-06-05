"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { removeNote } from "../server/actions/remove-note";
import { toast } from "sonner";
import { useParams } from "next/navigation";

export default function NoteDeleteButton() {
  const [isPending, startTransition] = useTransition();
  const { noteId } = useParams();

  const handleDelete = async () => {
    startTransition(async () => {
      const { success, message } = await removeNote(noteId as string);
      if (!success) {
        toast.error(message || "Failed to delete note");
        return;
      }

      toast.success("Note deleted successfully");
    });
  };

  return (
    <Button disabled={isPending} onClick={handleDelete}>
      {isPending ? "Deleting..." : "Delete Note"}
    </Button>
  );
}
// cog_wnhccpnujwiyciqhosnek3gsak2ri45tuebs5q7ursbtfzbfmfma
