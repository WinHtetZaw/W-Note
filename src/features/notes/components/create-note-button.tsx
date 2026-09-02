"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { createNote } from "../server/actions/create-note";
import { Plus } from "lucide-react";

type Props = {
  workspaceId: string;
  folderId?: string;
  className?: string;
  variant?:
    "link" | "default" | "outline" | "secondary" | "ghost" | "destructive";
};

export default function CreateNoteButton(props: Props) {
  const { workspaceId, folderId, className, variant } = props;
  const [isPending, startTransition] = useTransition();

  const handleCreate = () => {
    startTransition(async () => {
      await createNote({ workspaceId, folderId });
    });
  };

  return (
    <Button
      onClick={handleCreate}
      disabled={isPending}
      className={className}
      variant={variant}
    >
      {/* Create Note */}
      <Plus className="size-4" />
      New Note
    </Button>
  );
}
