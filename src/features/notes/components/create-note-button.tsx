"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { createNote } from "../server/actions/create-note";

type Props = {
  workspaceId: string;
  folderId?: string | null;
};

export default function CreateNoteButton(props: Props) {
  const { workspaceId, folderId = null } = props;
  const [isPending, startTransition] = useTransition();
  const handleCreate = () => {
    startTransition(async () => {
      await createNote({ workspaceId, folderId });
    });
  };
  return (
    <Button onClick={handleCreate} disabled={isPending}>
      Create Note
    </Button>
  );
}
