"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect, useTransition } from "react";
import { editorExtensions } from "./editor-extensions";
import EditorToolbar from "./editor-toolbar";
import { Button } from "@/components/ui/button";
import { editNote } from "../../server/actions/edit-note";
import { toast } from "sonner";

type Props = {
  // content: Record<string, unknown>;
  workspaceId: string;
  noteId: string;
  title: string;
  content: string | null;
  //   onChange: (content: Record<string, unknown>) => void;
};

export default function NoteEditor({
  content,
  title,
  noteId,
  workspaceId,
}: Props) {
  const editor = useEditor({
    extensions: editorExtensions,
    content: content ? JSON.parse(content) : "",
    editorProps: {
      attributes: {
        class: "min-h-[700px] outline-none text-lg leading-8 text-zinc-200",
      },
    },
    onUpdate({ editor }) {
      console.log(editor.getJSON());
    },
  });
  const [pending, startTransition] = useTransition();

  // useEffect(() => {
  //   if (editor && content) {
  //     editor.commands.setContent(content);
  //     console.log("hello");
  //   }
  // }, [editor]);

  const handleSave = () => {
    console.log(
      JSON.stringify(editor.getJSON()),
      "---",
      editor.getText().length,
    );
    startTransition(async () => {
      const res = await editNote({
        workspaceId,
        noteId,
        title,
        content: JSON.stringify(editor.getJSON()),
      });

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);
    });
  };

  return (
    <>
      {/* <div className="">
        <EditorToolbar editor={editor} />
        <EditorContent editor={editor} className="prose porse-invert" />
      </div>
      <Button onClick={handleSave}>Save</Button> */}
      <div className="grid gap-6 p-6 xl:grid-cols-[1fr_350px]">
        <div className="glass p-10 rounded-4xl">
          <div className=" mb-8 flex items-center justify-between rounded-3xl glass-violet p-5">
            <div>
              <h3 className="font-semibold">AI Assistant Active</h3>

              <p className="text-sm text-zinc-400">
                Generate summaries, rewrite content, and more.
              </p>
            </div>
          </div>

          <div className="">
            <EditorToolbar editor={editor} />
            <EditorContent editor={editor} className="prose porse-invert" />
          </div>
          {/* <UpdateNoteButton/> */}
        </div>

        {/* your existing AI sidebar */}
        <Button onClick={handleSave}>Save</Button>
      </div>
    </>
  );
}
