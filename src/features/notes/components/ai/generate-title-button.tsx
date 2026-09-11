"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useTransition } from "react";
import { summarizeNote } from "../../server/actions/summarize-note";
import { toast } from "sonner";
import { errorMessages } from "@/lib/errors";
import { useRouter } from "next/navigation";
import { generateNoteTitle } from "../../server/actions/generate-note-title";

type Props = {
  workspaceId: string;
  noteId: string;
  setUserTitle: (title: string) => void;
};

export default function GenerateTitleButton(props: Props) {
  const { workspaceId, noteId, setUserTitle } = props;

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = () => {
    startTransition(async () => {
      const result = await generateNoteTitle(props);

      if (result.code) {
        console.error(result);
        toast.error(errorMessages[result.code]);
        return;
      }

      setUserTitle(result.data.title);
      toast.success("Successfully generate title.");
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
      <span>Generate Title</span>

      <Sparkles className="size-4 text-icon" />
    </Button>
  );
}
