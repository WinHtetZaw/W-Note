"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect, useState, useTransition } from "react";
import { editorExtensions } from "./editor-extensions";
import EditorToolbar from "./editor-toolbar";
import { Button } from "@/components/ui/button";
import { editNote } from "../../server/actions/edit-note";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Wand2 } from "lucide-react";
import { AI_REQUEST_TYPES } from "@/features/ai/constants/ai.constants";
import SummarizeNoteButton from "../ai/summarize-note-button";
import GenerateTitleButton from "../ai/generate-title-button";
import { CopyButton } from "@/components/ui/copy-button";
import { errorMessages } from "@/lib/errors";
import { useRouter } from "next/navigation";

type Props = {
  // content: Record<string, unknown>;
  workspaceId: string;
  noteId: string;
  title: string;
  content: string;
  //   onChange: (content: Record<string, unknown>) => void;
};

export default function NoteEditor({
  content,
  title,
  noteId,
  workspaceId,
}: Props) {
  const [summary, setSummary] = useState<string>("");
  const editor = useEditor({
    extensions: editorExtensions,
    content: content ? JSON.parse(content) : "",
    editorProps: {
      attributes: {
        class: "min-h-[700px] outline-none text-lg leading-8 text-zinc-200",
      },
    },
    // onUpdate({ editor }) {
    //   console.log(editor.getJSON());
    // },
  });
  const [pending, startTransition] = useTransition();
  const [userTitle, setUserTitle] = useState(title);
  const router = useRouter();

  // useEffect(() => {
  //   if (editor && content) {
  //     editor.commands.setContent(content);
  //     console.log("hello");
  //   }
  // }, [editor]);

  const handleSave = () => {
    startTransition(async () => {
      const result = await editNote({
        workspaceId,
        noteId,
        title: userTitle,
        content: JSON.stringify(editor.getJSON()),
      });
      if (result.code) {
        toast.error(errorMessages[result.code]);
        return;
      }
      toast.success("Successfully saved.");
      router.back();
    });
  };

  return (
    <>
      <div className="grid gap-6 p-6 xl:grid-cols-[1fr_350px]">
        <div className="glass p-10 rounded-4xl">
          <h1 className="text-3xl mb-8 font-bold tracking-wider uppercase">
            {title}
          </h1>
          <div className="mb-8">
            <Label className="mb-2 text-muted">Edit Title</Label>
            <Input
              value={userTitle}
              onChange={(e) => setUserTitle(e.target.value)}
            />
          </div>
          <div className=" mb-8 flex items-center justify-between rounded-3xl glass-violet p-5">
            <div>
              <h2 className="font-semibold">AI Assistant Active</h2>

              <p className="text-sm text-zinc-400">
                Generate summaries, rewrite content, and more.
              </p>
            </div>
          </div>

          <div>
            <EditorToolbar editor={editor} />
            <div className="h-[75vh] custom-scroll">
              <EditorContent editor={editor} className="prose porse-invert" />
            </div>
          </div>
        </div>
        <aside className="space-y-6">
          {/* AI Tools */}
          <div className="rounded-[32px] space-y-6 glass p-6 backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <Wand2 className="size-6 text-icon" />

              <div>
                <h2 className="text-xl font-bold">AI Tools</h2>

                <p className="text-sm text-zinc-400">
                  Smart productivity actions
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <SummarizeNoteButton
                noteId={noteId}
                workspaceId={workspaceId}
                setSummary={setSummary}
              />
              <GenerateTitleButton
                noteId={noteId}
                workspaceId={workspaceId}
                setUserTitle={setUserTitle}
              />
            </div>
          </div>
        </aside>
      </div>
      {summary && (
        <div className="glass p-4 rounded-3xl relative overflow-hidden">
          <CopyButton text={summary} className=" absolute top-2 right-3" />
          <pre className=" text-wrap">{summary}</pre>
        </div>
      )}
      <Button onClick={handleSave} disabled={pending}>
        Save
      </Button>
    </>
  );
}
