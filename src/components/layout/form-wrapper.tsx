import { cn } from "@/lib/utils";
import { Brain, Sparkles } from "lucide-react";

type Props = {
  children: React.ReactNode;
  title: string;
  formTitle: string;
  desc: string;
  isNoteForm?: boolean;
};

export default function FormWrapper({
  children,
  title,
  formTitle,
  desc,
  isNoteForm,
}: Props) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-4xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
        <div
          className={cn(
            "mb-8",
            isNoteForm &&
              "flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between",
          )}
        >
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4 text-violet-400" />
              {title}
            </div>

            <h1 className="text-4xl font-black">{formTitle}</h1>

            <p className="mt-4 text-zinc-400">{desc}</p>
          </div>
          {isNoteForm && (
            <button className="flex items-center gap-2 rounded-2xl border border-violet-500/20 bg-violet-500/10 px-5 py-4 text-violet-300 transition hover:bg-violet-500/20">
              <Brain className="h-5 w-5" />
              Generate with AI
            </button>
          )}
        </div>

        {children}
      </div>
    </div>
  );
}
