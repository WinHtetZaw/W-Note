import { Sparkles } from "lucide-react";

type Props = {
  children: React.ReactNode;
  title?: string;
  desc?: string;
};

export default function WorkspaceFormWrapper({ children, title, desc }: Props) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-4xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
        <div className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
            <Sparkles className="h-4 w-4 text-violet-400" />
            Workspace Setup
          </div>

          <h1 className="text-4xl font-black">{title ?? "Workspace Setup"}</h1>

          <p className="mt-4 text-zinc-400">
            {desc ?? "Configure your AI workspace settings."}
          </p>
        </div>

        {children}
      </div>
    </div>
  );
}
