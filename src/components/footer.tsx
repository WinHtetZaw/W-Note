import { Brain } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-violet-400" />
          <span className="font-semibold">NoteAI</span>
        </div>

        <div className="flex items-center gap-6 text-sm text-zinc-400">
          <Link href="/features">Features</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/sign-in">Sign In</Link>
        </div>

        <p className="text-sm text-zinc-500">
          © 2026 NoteAI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
