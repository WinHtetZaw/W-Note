"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { removeNote } from "../server/actions/remove-note";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { errorMessages } from "@/lib/errors";

type Params = { workspaceId: string; folderId?: string; noteId: string };

export default function NoteDeleteButton() {
  const [isPending, startTransition] = useTransition();
  const { noteId, workspaceId, folderId } = useParams<Params>();

  const handleDelete = async () => {
    startTransition(async () => {
      const res = await removeNote({ workspaceId, folderId, noteId });
      if (res.code) {
        toast.error(errorMessages[res.code]);
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
