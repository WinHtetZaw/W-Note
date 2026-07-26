"use client";

import { useEditor, EditorContent } from "@tiptap/react";

import { editorExtensions } from "../components/editor/editor-extensions";

type Props = {
  content: Record<string, unknown>;
  onChange: (value: Record<string, unknown>) => void;
};

export function NoteEditor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: editorExtensions,
    content,
    onUpdate({ editor }) {
      onChange(editor.getJSON());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <EditorContent editor={editor} className="prose max-w-none min-h-125" />
  );
}
