import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

export const editorExtensions = [
  StarterKit,
  Underline,
  Link.configure({ openOnClick: false }),
  Placeholder.configure({
    placeholder: "Start writing...",
  }),
];
