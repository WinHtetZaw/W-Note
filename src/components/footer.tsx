import { Brain } from "lucide-react";
import Link from "next/link";

export default function Footer({ showLogo = true }: { showLogo?: boolean }) {
  return (
    <footer className="mt-auto relative border-t border-white/10 bg-zinc-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 p-6">
        {showLogo && (
          <div className="absolute left-6 hidden lg:flex items-center gap-2">
            <Brain className="h-6 w-6 text-violet-400" />
            <span className="font-semibold">NoteAI</span>
          </div>
        )}

        <div className="flex items-center gap-6 text-sm text-muted">
          <Link href="/features">Features</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/">Home</Link>
        </div>

        <p className="text-sm text-zinc-500">
          © 2026 NoteAI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
