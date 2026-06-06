import { Sparkles } from "lucide-react";
import React from "react";

type Props = {
  children: React.ReactNode;
  pageTitle: string;
  formTitle: string;
  formDescription: string;
  link: React.ReactNode;
};

export default function AuthFormWrapper(props: Props) {
  const { children, pageTitle, formTitle, formDescription, link } = props;
  return (
    <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
          <Sparkles className="h-4 w-4 text-violet-400" />
          {pageTitle}
        </div>

        <h1 className="text-4xl font-black text-white">{formTitle}</h1>

        <p className="mt-4 text-zinc-400">{formDescription}</p>
      </div>
      {children}
      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-sm text-zinc-500">OR</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>
      <button className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 transition hover:bg-white/10">
        Continue with Google
      </button>
      <p className="mt-8 text-center text-zinc-400">{link}</p>
    </div>
  );
}
