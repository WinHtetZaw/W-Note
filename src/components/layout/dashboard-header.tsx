import { Bell, Search } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between px-6">
        {/* Search */}
        <div className="hidden w-full max-w-xl items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 md:flex">
          <Search className="h-5 w-5 text-zinc-500" />

          <input
            placeholder="Search notes..."
            className="w-full bg-transparent outline-none placeholder:text-zinc-500"
          />
        </div>

        {/* Right */}
        <div className="ml-auto flex items-center gap-4">
          <button className="relative rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10">
            <Bell className="h-5 w-5" />

            <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-violet-500" />
          </button>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 font-bold">
              Z
            </div>

            <div className="hidden md:block">
              <p className="text-sm font-medium">Zeed</p>

              <p className="text-xs text-zinc-400">Pro Plan</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
