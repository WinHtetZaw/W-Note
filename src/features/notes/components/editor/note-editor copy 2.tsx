"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { editorExtensions } from "./editor-extensions";
import EditorToolbar from "./editor-toolbar";
import { Button } from "@/components/ui/button";
import { editNote } from "../../server/actions/edit-note";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wand2 } from "lucide-react";
import SummarizeNoteButton from "../ai/summarize-note-button";
import GenerateTitleButton from "../ai/generate-title-button";
import { CopyButton } from "@/components/ui/copy-button";
import { errorMessages } from "@/lib/errors";
import { useRouter } from "next/navigation";

type Props = {
  workspaceId: string;
  noteId: string;
  title: string;
  content: string;
};

type SaveStatus = "saved" | "unsaved" | "saving" | "error";

export default function NoteEditor(props: Props) {
  const { content, title, noteId, workspaceId } = props;

  const [summary, setSummary] = useState<string>("");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");

  // Incremented whenever the document changes.
  const [changeVersion, setChangeVersion] = useState(0);
  const savedVersionRef = useRef(0);
  const savingRef = useRef(false);
  const [pending, startTransition] = useTransition();
  const [userTitle, setUserTitle] = useState(title);
  const router = useRouter();

  const editor = useEditor({
    extensions: editorExtensions,
    content: content ? JSON.parse(content) : "",
    editorProps: {
      attributes: {
        class: "min-h-[700px] outline-none text-lg leading-8 text-zinc-200",
      },
    },
    onUpdate() {
      setChangeVersion((version) => version + 1);
      setSaveStatus("unsaved");
    },
  });

  // useEffect(() => {
  //   if (editor && content) {
  //     editor.commands.setContent(content);
  //     console.log("hello");
  //   }
  // }, [editor]);

  // Title changes also make the note dirty.
  const handleTitleChange = (value: string) => {
    setUserTitle(value);
    setChangeVersion((version) => version + 1);
    setSaveStatus("unsaved");
  };

  // const handleSave = () => {
  //   startTransition(async () => {
  //     const result = await editNote({
  //       workspaceId,
  //       noteId,
  //       title: userTitle,
  //       content: JSON.stringify(editor.getJSON()),
  //     });
  //     if (result.code) {
  //       toast.error(errorMessages[result.code]);
  //       return;
  //     }
  //     toast.success("Successfully saved.");
  //     router.back();
  //   });
  // };

  const saveNote = useCallback(async () => {
    if (!editor || savingRef.current) return;

    // Nothing new to save.
    if (savedVersionRef.current === changeVersion) return;

    savingRef.current = true;
    setSaveStatus("saving");

    // Snapshot the values being saved.
    const versionToSave = changeVersion;
    const titleToSave = userTitle;
    const contentToSave = JSON.stringify(editor.getJSON());

    try {
      const result = await editNote({
        workspaceId,
        noteId,
        title: titleToSave,
        content: contentToSave,
      });

      if (result.code) {
        toast.error(errorMessages[result.code]);
        setSaveStatus("error");
        return;
      }

      savedVersionRef.current = versionToSave;

      // Don't mark as saved if user edited during the request.
      if (versionToSave === changeVersion) {
        setSaveStatus("saved");
      } else {
        setSaveStatus("unsaved");
      }
    } catch {
      setSaveStatus("error");
      toast.error("Unable to save your note.");
    } finally {
      savingRef.current = false;
    }
  }, [editor, changeVersion, userTitle, workspaceId, noteId]);

  // Debounced autosave: wait until the user pauses editing.
  useEffect(() => {
    if (!editor || changeVersion === savedVersionRef.current) {
      return;
    }

    const timeout = setTimeout(() => {
      void saveNote();
    }, 1500);

    return () => clearTimeout(timeout);
  }, [editor, changeVersion, saveNote]);

  // Periodic backup while there are unsaved changes.
  useEffect(() => {
    if (!editor) return;

    const interval = setInterval(() => {
      if (savedVersionRef.current !== changeVersion) {
        void saveNote();
      }
    }, 30_000);

    return () => clearInterval(interval);
  }, [editor, changeVersion, saveNote]);

  const handleManualSave = async () => {
    await saveNote();
    router.back();
  };

  return (
    <>
      <div className="grid gap-6 p-6 xl:grid-cols-[1fr_350px]">
        <div className="glass p-10 rounded-4xl">
          <h1 className="text-3xl mb-8 font-bold tracking-wider uppercase">
            {userTitle}
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
            <div className="h-[40vh] custom-scroll">
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
      <div className="flex items-center justify-between p-6">
        <span className="text-sm text-muted-foreground">
          {saveStatus === "saving" && "Saving…"}
          {saveStatus === "saved" && "All changes saved"}
          {saveStatus === "unsaved" && "Unsaved changes"}
          {saveStatus === "error" && "Save failed"}
        </span>

        <Button onClick={handleManualSave} disabled={saveStatus === "saving"}>
          Save & Back
        </Button>
      </div>
    </>
  );
}
