"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useTransition } from "react";
import { summarizeNote } from "../../server/actions/summarize-note";
import { toast } from "sonner";
import { errorMessages } from "@/lib/errors";
import { useRouter } from "next/navigation";

type Props = {
  workspaceId: string;
  noteId: string;
  setSummary: (summary: string) => void;
};

export default function SummarizeNoteButton(props: Props) {
  const { workspaceId, noteId, setSummary } = props;
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  //   const workspaceId = params.workspaceId;
  // if (typeof workspaceId !== "string") {
  //   throw new Error("Invalid workspace ID");
  // }

  const handleClick = () => {
    startTransition(async () => {
      const result = await summarizeNote({ workspaceId, noteId });

      if (result.code) {
        console.error(result);
        toast.error(errorMessages[result.code]);
        return;
      }

      setSummary(result.data.summary);
      toast.success("Successfully summarize note.");
      router.refresh();
    });
  };

  return (
    <Button
      variant={"outline"}
      onClick={handleClick}
      disabled={isPending}
      className="flex w-full capitalize p-4 items-center justify-between"
    >
      <span>Summarize Note</span>

      <Sparkles className="size-4 text-icon" />
    </Button>
  );
}
