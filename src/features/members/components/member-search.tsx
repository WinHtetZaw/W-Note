// features/workspace/members/components/member-search.tsx

"use client";

import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function MemberSearch({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
      <Search className="h-5 w-5 text-zinc-500" />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search members..."
        className="w-full bg-transparent outline-none placeholder:text-zinc-500"
      />
    </div>
  );
}
